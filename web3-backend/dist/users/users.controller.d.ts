import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(req: any): Promise<{
        error: string;
        id?: undefined;
        email?: undefined;
        name?: undefined;
        avatar?: undefined;
        createdAt?: undefined;
    } | {
        id: string;
        email: string;
        name: string | null;
        avatar: string | null;
        createdAt: Date;
        error?: undefined;
    }>;
}
