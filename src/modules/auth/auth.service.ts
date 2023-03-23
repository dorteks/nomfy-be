import {
  VerifyOtpBody,
  CreateUserBody,
  ResetPasswordBody,
  ForgotPasswordBody,
} from './dto/auth.request.dto';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Argon2 } from 'src/core/utils/argon2';
import { MESSAGES } from 'src/core/constants/messages';
import { PrismaService } from '../prisma/prisma.service';
import { generateHash, generateOtp } from 'src/core/utils/generate';

@Injectable({})
export class AuthService {
  constructor(
    private readonly argon2: Argon2,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      select: { email: true, password: true, id: true },
    });

    if (user && (await this.argon2.verify(user.password, password))) {
      const { password, ...result } = user;
      return result;
    }
    return undefined;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };

    const accessToken = this.jwt.sign(payload);
    console.log(accessToken);

    return { accessToken };
  }

  async forgotPassword(body: ForgotPasswordBody) {
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
      select: { email: true },
    });

    if (!user) return undefined;
    // logic to send mail to user
    return 'Reset Password link has been sent to your registered email';
  }

  async resetPassword(body: ResetPasswordBody) {
    return await this.prisma.user.update({
      where: { email: body.email },
      data: { password: await this.argon2.hash(body.password) },
    });
  }

  async getUsers() {
    await this.prisma.user.findMany();
  }

  async createUser(body: CreateUserBody) {
    const code = generateOtp();
    console.log(code, 'generated code');

    await this.prisma.user.create({
      select: { id: true },
      data: {
        role: 'ADMIN',
        email: body.email,
        lastName: body.lastName,
        firstName: body.firstName,
        middleName: body.middleName,
        phoneNumber: body.phoneNumber,
        password: await this.argon2.hash(body.password),
        otp: { create: { verified: false, code: generateHash(code) } },
      },
    });
    return {};
  }

  async verifyOtp(body: VerifyOtpBody) {
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
      select: { otp: true },
    });

    if (user.otp.code === generateHash(body.otp))
      try {
        return await this.prisma.user.update({
          where: { email: body.email },
          data: { otp: { update: { verified: true } } },
        });
      } catch (error: any) {
        return error.message;
      }
    else {
      return MESSAGES.INCORRECT_PIN;
    }
  }
}
