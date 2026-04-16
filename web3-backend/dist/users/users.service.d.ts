import { PrismaService } from '../prisma/prisma.service';
export interface CreateUserDto {
    email: string;
    name?: string;
    avatar?: string;
    googleId?: string;
}
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByGoogleId(googleId: string): Promise<{
        id: string;
        email: string;
        googleId: string | null;
        name: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        googleId: string | null;
        name: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        googleId: string | null;
        name: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: CreateUserDto): Promise<{
        id: string;
        email: string;
        googleId: string | null;
        name: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOrCreate(data: CreateUserDto): Promise<{
        id: string;
        email: string;
        googleId: string | null;
        name: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
