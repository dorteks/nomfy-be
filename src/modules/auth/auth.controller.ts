import {
  VerifyOtpBody,
  CreateUserBody,
  ResetPasswordBody,
  ForgotPasswordBody,
} from './dto/auth.request.dto';
import {
  Get,
  Body,
  Post,
  Controller,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MESSAGES } from 'src/core/constants/messages';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordBody) {
    try {
      const data = await this.auth.forgotPassword(body);
      return { data, message: MESSAGES.SUCCESS };
    } catch (error: any) {
      throw new InternalServerErrorException({
        technicalMessage: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: ResetPasswordBody) {
    try {
      const data = await this.auth.resetPassword(body);
      return { data, message: MESSAGES.SUCCESS };
    } catch (error: any) {
      throw new InternalServerErrorException({
        technicalMessage: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Get('/')
  async getUsers() {
    try {
      const data = await this.auth.getUsers();
      return { data, message: MESSAGES.SUCCESS };
    } catch (error: any) {
      throw new InternalServerErrorException({
        technialMessage: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Post('/create')
  async createUser(@Body() body: CreateUserBody) {
    try {
      const data = await this.auth.createUser(body);
      return { data, message: MESSAGES.SUCCESS };
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException({
        technialMessage: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Post('/verify-otp')
  async verifyOtp(@Body() body: VerifyOtpBody) {
    try {
      const data = await this.auth.verifyOtp(body);
      console.log(data, 'data');
      return { data, message: MESSAGES.SUCCESS };
    } catch (error: any) {
      throw new InternalServerErrorException({
        technialMessage: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
