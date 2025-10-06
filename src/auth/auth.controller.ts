import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { UserLoginPayloadDto } from './dto/user-payload.dto';
import { Auth } from './decorators/auth/auth.decorator';
import { AuthType } from './enum/auth-type.enum';
import { RefreshTokenPayloadDto } from './dto/refresh-token-payload.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Auth(AuthType.None)
  public login(@Body() body: UserLoginPayloadDto) {
    return this.authService.login(body);
  }

  @Post('refresh-token')
  @Auth(AuthType.None)
  public refreshToken(@Body() body: RefreshTokenPayloadDto) {
    return this.authService.refreshToken(body.refreshToken);
  }
}
