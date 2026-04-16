import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateUserDto {
  email: string;
  name?: string;
  avatar?: string;
  googleId?: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByGoogleId(googleId: string) {
    return this.prisma.user.findUnique({ where: { googleId } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async findOrCreate(data: CreateUserDto) {
    if (data.googleId) {
      const existing = await this.findByGoogleId(data.googleId);
      if (existing) return existing;
    }
    const byEmail = await this.findByEmail(data.email);
    if (byEmail) {
      return this.prisma.user.update({
        where: { email: data.email },
        data: { googleId: data.googleId, avatar: data.avatar, name: data.name },
      });
    }
    return this.create(data);
  }
}
