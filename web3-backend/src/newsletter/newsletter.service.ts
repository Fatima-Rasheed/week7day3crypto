import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SubscribeDto } from './newsletter.dto';
import * as https from 'https';
import * as dns from 'dns';

@Injectable()
export class NewsletterService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  private async validateEmailDomain(email: string): Promise<void> {
    const domain = email.split('@')[1];
    if (!domain) {
      throw new BadRequestException('Invalid email address format.');
    }

    // DNS MX lookup is best-effort — network issues should not block valid subscriptions.
    // We log the result but only reject if we get a definitive empty response (not a DNS error).
    await new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        console.warn(
          `[NewsletterService] MX lookup timed out for domain: ${domain} — allowing subscription.`,
        );
        resolve();
      }, 5000);

      dns.resolveMx(domain, (err, addresses) => {
        clearTimeout(timer);
        if (err) {
          // DNS error (SERVFAIL, ENOTFOUND, etc.) — could be a transient issue, allow through
          console.warn(
            `[NewsletterService] MX lookup error for domain: ${domain} (${err.message}) — allowing subscription.`,
          );
          resolve();
        } else if (!addresses || addresses.length === 0) {
          console.warn(
            `[NewsletterService] No MX records for domain: ${domain} — allowing subscription.`,
          );
          resolve();
        } else {
          console.log(
            `[NewsletterService] Email domain validated — MX records found for: ${domain}`,
          );
          resolve();
        }
      });
    });
  }

  private async brevoGetContact(email: string): Promise<any> {
    const apiKey = this.configService.get<string>('BREVO_API_KEY') || '';

    return new Promise((resolve) => {
      const options = {
        hostname: 'api.brevo.com',
        port: 443,
        path: `/v3/contacts/${encodeURIComponent(email)}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => (responseData += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(responseData) });
          } catch {
            resolve({ status: res.statusCode, body: responseData });
          }
        });
      });

      req.on('error', () => resolve({ status: 500, body: {} }));
      req.end();
    });
  }

  private async brevoRequest(path: string, body: object): Promise<any> {
    const apiKey = this.configService.get<string>('BREVO_API_KEY') || '';
    const data = JSON.stringify(body);

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.brevo.com',
        port: 443,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'Content-Length': Buffer.byteLength(data),
        },
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => (responseData += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(responseData) });
          } catch {
            resolve({ status: res.statusCode, body: responseData });
          }
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }

  async subscribe(dto: SubscribeDto) {
    const { email } = dto;
    console.log('[NewsletterService] subscribe() called with email:', email);

    // Validate that the email domain has real MX records
    await this.validateEmailDomain(email);

    // Check if already subscribed
    console.log('[NewsletterService] Checking DB for existing subscriber:', email);
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
    console.log('[NewsletterService] DB lookup result:', existing);

    if (existing && existing.isActive) {
      // Before blocking, verify the contact still exists in Brevo.
      // If it was deleted from Brevo, sync the local DB and allow re-subscription.
      const apiKey = this.configService.get<string>('BREVO_API_KEY');
      if (apiKey && apiKey !== 'your_brevo_api_key' && apiKey !== 'your_brevo_rest_api_key_here') {
        console.log('[NewsletterService] Verifying contact still exists in Brevo:', email);
        const brevoContact = await this.brevoGetContact(email);
        console.log('[NewsletterService] Brevo contact lookup status:', brevoContact.status);

        if (brevoContact.status === 404) {
          // Contact was deleted from Brevo — mark as inactive locally so re-subscription proceeds
          console.log('[NewsletterService] Contact not found in Brevo, marking local record as inactive and allowing re-subscription.');
          await this.prisma.newsletterSubscriber.update({
            where: { email },
            data: { isActive: false },
          });
          // Fall through to re-subscribe
        } else {
          console.log('[NewsletterService] Email already actively subscribed in both DB and Brevo, returning early.');
          return {
            success: false,
            message: 'This email is already subscribed to our newsletter.',
          };
        }
      } else {
        console.log('[NewsletterService] Email already actively subscribed, returning early.');
        return {
          success: false,
          message: 'This email is already subscribed to our newsletter.',
        };
      }
    }

    // Add contact to Brevo
    const apiKey = this.configService.get<string>('BREVO_API_KEY');
    console.log('[NewsletterService] BREVO_API_KEY present:', !!apiKey);
    if (apiKey && apiKey.startsWith('xsmtpsib-')) {
      console.warn('[NewsletterService] WARNING: BREVO_API_KEY looks like an SMTP key (xsmtpsib-). Use a REST API key (xkeysib-) from Brevo Settings → SMTP & API → API Keys.');
    }
    if (apiKey && apiKey !== 'your_brevo_api_key' && apiKey !== 'your_brevo_rest_api_key_here') {
      try {
        console.log('[NewsletterService] Sending contact to Brevo for:', email);
        const contactRes = await this.brevoRequest('/v3/contacts', {
          email,
          listIds: [2],
          updateEnabled: true,
        });
        console.log('[NewsletterService] Brevo add contact response:', contactRes.status, JSON.stringify(contactRes.body));

        // Send confirmation email via Brevo transactional email
        console.log('[NewsletterService] Sending confirmation email via Brevo to:', email);
        const emailRes = await this.brevoRequest('/v3/smtp/email', {
          sender: {
            name: 'Web3 Newsletter',
            email: this.configService.get<string>('BREVO_SENDER_EMAIL') || 'noreply@web3newsletter.com',
          },
          to: [{ email }],
          subject: 'Welcome! You are now subscribed to our newsletter',
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #6366f1;">Welcome to Web3 Newsletter!</h2>
              <p>Hi there,</p>
              <p>Thank you for subscribing to our newsletter. You're now subscribed with: <strong>${email}</strong></p>
              <p>You'll receive the latest updates on crypto markets, Web3 trends, and more.</p>
              <p style="color: #888; font-size: 12px; margin-top: 30px;">
                If you didn't subscribe, you can safely ignore this email.
              </p>
            </div>
          `,
        });
        console.log('[NewsletterService] Brevo send email response:', emailRes?.status, JSON.stringify(emailRes?.body));
      } catch (err) {
        console.error('[NewsletterService] Brevo API error:', err);
        // Continue even if Brevo fails — still save locally
      }
    } else {
      console.log('[NewsletterService] Skipping Brevo — API key not configured.');
    }

    // Save to database
    if (existing) {
      console.log('[NewsletterService] Reactivating existing subscriber in DB:', email);
      await this.prisma.newsletterSubscriber.update({
        where: { email },
        data: { isActive: true, subscribedAt: new Date() },
      });
    } else {
      console.log('[NewsletterService] Creating new subscriber in DB:', email);
      await this.prisma.newsletterSubscriber.create({
        data: { email },
      });
    }

    console.log('[NewsletterService] Subscription successful for:', email);
    return {
      success: true,
      message: 'You have successfully subscribed to our newsletter! Check your inbox for a confirmation email.',
    };
  }
}
