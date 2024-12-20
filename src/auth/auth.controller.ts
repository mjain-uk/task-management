import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dtos/user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: UserDto): Promise<void> {
    return await this.authService.signup(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() body: UserDto): Promise<Record<string, string>> {
    return await this.authService.signin(body);
  }
}
