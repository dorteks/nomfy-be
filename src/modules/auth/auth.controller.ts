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
  Request,
  UseGuards,
  Controller,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { MESSAGES } from 'src/core/constants/messages';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    try {
      const data = this.auth.login(req.user);
      return { data, message: MESSAGES.SUCCESS };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        technicalMessage: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    try {
      const data = req.user;
      return { data, message: MESSAGES.SUCCESS };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        technicalMessage: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordBody) {
    try {
      const data = await this.auth.forgotPassword(body);
      return { data, message: MESSAGES.SUCCESS };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
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
      if (error instanceof HttpException) throw error;
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
      if (error instanceof HttpException) throw error;
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
      if (error instanceof HttpException) throw error;
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
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        technialMessage: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
