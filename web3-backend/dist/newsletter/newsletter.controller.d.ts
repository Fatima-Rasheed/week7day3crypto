import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './newsletter.dto';
export declare class NewsletterController {
    private newsletterService;
    constructor(newsletterService: NewsletterService);
    subscribe(dto: SubscribeDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
