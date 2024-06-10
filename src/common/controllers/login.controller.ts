import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginService } from '../services/login.service';

@Controller('/auth')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('/login')
  async login(@Body() body: { _username: string; _password: string }) {
    const user = await this.loginService.validateUser(
      body._username,
      body._password,
    );
    if (!user) {
      throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED);
    }
    return this.loginService.login(user);
  }
}
