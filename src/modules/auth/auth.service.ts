import { Injectable } from '@nestjs/common';
import { Argon2 } from 'src/core/utils/argon2';
import { CreateUserBody } from './dto/auth.request.dto';
import { PrismaService } from '../prisma/prisma.service';
import { generateHash, generateOtp } from 'src/core/utils/generate';

@Injectable({})
export class AuthService {
  constructor(
    private readonly argon2: Argon2,
    private readonly prisma: PrismaService,
  ) {}

  async getUsers() {
    await this.prisma.user.findMany();
  }

  async CreateUSer(body: CreateUserBody) {
    const code = generateOtp();
    console.log(code, 'generated code');

    await this.prisma.user.create({
      select: { id: true },
      data: {
        email: body.email,
        password: await this.argon2.hash(body.password),
        phoneNumber: body.phoneNumber,
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        role: 'ADMIN',
        otp: { create: { verified: false, code: generateHash(code) } },
      },
    });
    return {};
  }
}
