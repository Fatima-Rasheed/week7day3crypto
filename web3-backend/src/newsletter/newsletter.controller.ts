import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './newsletter.dto';

@Controller('newsletter')
export class NewsletterController {
  constructor(private newsletterService: NewsletterService) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async subscribe(@Body() dto: SubscribeDto) {
    return this.newsletterService.subscribe(dto);
  }
}
