"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const https = __importStar(require("https"));
const dns = __importStar(require("dns"));
let NewsletterService = class NewsletterService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async validateEmailDomain(email) {
        const domain = email.split('@')[1];
        if (!domain) {
            throw new common_1.BadRequestException('Invalid email address format.');
        }
        await new Promise((resolve) => {
            const timer = setTimeout(() => {
                console.warn(`[NewsletterService] MX lookup timed out for domain: ${domain} — allowing subscription.`);
                resolve();
            }, 5000);
            dns.resolveMx(domain, (err, addresses) => {
                clearTimeout(timer);
                if (err) {
                    console.warn(`[NewsletterService] MX lookup error for domain: ${domain} (${err.message}) — allowing subscription.`);
                    resolve();
                }
                else if (!addresses || addresses.length === 0) {
                    console.warn(`[NewsletterService] No MX records for domain: ${domain} — allowing subscription.`);
                    resolve();
                }
                else {
                    console.log(`[NewsletterService] Email domain validated — MX records found for: ${domain}`);
                    resolve();
                }
            });
        });
    }
    async brevoGetContact(email) {
        const apiKey = this.configService.get('BREVO_API_KEY') || '';
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
                    }
                    catch {
                        resolve({ status: res.statusCode, body: responseData });
                    }
                });
            });
            req.on('error', () => resolve({ status: 500, body: {} }));
            req.end();
        });
    }
    async brevoRequest(path, body) {
        const apiKey = this.configService.get('BREVO_API_KEY') || '';
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
                    }
                    catch {
                        resolve({ status: res.statusCode, body: responseData });
                    }
                });
            });
            req.on('error', reject);
            req.write(data);
            req.end();
        });
    }
    async subscribe(dto) {
        const { email } = dto;
        console.log('[NewsletterService] subscribe() called with email:', email);
        await this.validateEmailDomain(email);
        console.log('[NewsletterService] Checking DB for existing subscriber:', email);
        const existing = await this.prisma.newsletterSubscriber.findUnique({
            where: { email },
        });
        console.log('[NewsletterService] DB lookup result:', existing);
        if (existing && existing.isActive) {
            const apiKey = this.configService.get('BREVO_API_KEY');
            if (apiKey && apiKey !== 'your_brevo_api_key' && apiKey !== 'your_brevo_rest_api_key_here') {
                console.log('[NewsletterService] Verifying contact still exists in Brevo:', email);
                const brevoContact = await this.brevoGetContact(email);
                console.log('[NewsletterService] Brevo contact lookup status:', brevoContact.status);
                if (brevoContact.status === 404) {
                    console.log('[NewsletterService] Contact not found in Brevo, marking local record as inactive and allowing re-subscription.');
                    await this.prisma.newsletterSubscriber.update({
                        where: { email },
                        data: { isActive: false },
                    });
                }
                else {
                    console.log('[NewsletterService] Email already actively subscribed in both DB and Brevo, returning early.');
                    return {
                        success: false,
                        message: 'This email is already subscribed to our newsletter.',
                    };
                }
            }
            else {
                console.log('[NewsletterService] Email already actively subscribed, returning early.');
                return {
                    success: false,
                    message: 'This email is already subscribed to our newsletter.',
                };
            }
        }
        const apiKey = this.configService.get('BREVO_API_KEY');
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
                console.log('[NewsletterService] Sending confirmation email via Brevo to:', email);
                const emailRes = await this.brevoRequest('/v3/smtp/email', {
                    sender: {
                        name: 'Web3 Newsletter',
                        email: this.configService.get('BREVO_SENDER_EMAIL') || 'noreply@web3newsletter.com',
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
            }
            catch (err) {
                console.error('[NewsletterService] Brevo API error:', err);
            }
        }
        else {
            console.log('[NewsletterService] Skipping Brevo — API key not configured.');
        }
        if (existing) {
            console.log('[NewsletterService] Reactivating existing subscriber in DB:', email);
            await this.prisma.newsletterSubscriber.update({
                where: { email },
                data: { isActive: true, subscribedAt: new Date() },
            });
        }
        else {
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
};
exports.NewsletterService = NewsletterService;
exports.NewsletterService = NewsletterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], NewsletterService);
//# sourceMappingURL=newsletter.service.js.map