import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { UserLoginPayloadDto } from './dto/user-payload.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public login(@Body() body: UserLoginPayloadDto) {
    return this.authService.login(body);
  }
}
