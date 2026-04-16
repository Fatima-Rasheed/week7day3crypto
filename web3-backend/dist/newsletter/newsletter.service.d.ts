import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SubscribeDto } from './newsletter.dto';
export declare class NewsletterService {
    private prisma;
    private configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    private validateEmailDomain;
    private brevoGetContact;
    private brevoRequest;
    subscribe(dto: SubscribeDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
