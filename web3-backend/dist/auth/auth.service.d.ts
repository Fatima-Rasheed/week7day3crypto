import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateToken(user: {
        id: string;
        email: string;
        name?: string | null;
    }): string;
}
