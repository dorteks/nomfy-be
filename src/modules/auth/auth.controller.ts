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
import { CreateUserBody } from './dto/auth.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

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
      const data = await this.auth.CreateUSer(body);
      console.log(data, 'user data');
      return { data, message: MESSAGES.SUCCESS };
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException({
        technialMessage: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
