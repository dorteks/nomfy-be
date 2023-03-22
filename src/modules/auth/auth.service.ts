import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    await this.prisma.user.findMany();
  }
}
