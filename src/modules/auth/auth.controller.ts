import { Controller, Get, Post } from '@nestjs/common';
import { MESSAGES } from 'src/core/constants/messages';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('/')
  async getUsers() {
    try {
      const data = await this.auth.getUsers();
      return { data, message: MESSAGES.SUCCESS };
    } catch (error) {
      return error;
    }
  }
}
