import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: { id: string; email: string; name?: string | null }) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    return this.jwtService.sign(payload);
  }
}
