import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/providers/users.service';
import jwtConfig from '../config/jwtConfig';
import { UserLoginPayloadDto } from '../dto/user-payload.dto';
import { HashingProvider } from './hasing.provider';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,
    private readonly tokenService: TokenService,
 
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public isAuthenticated() {
    return true;
  }

  public async login(loginPayload: UserLoginPayloadDto) {
    const user = await this.usersService.findByEmail(loginPayload.email);

    const isPasswordValid = await this.hashingProvider.comparePassword(
      loginPayload.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: await this.tokenService.generateToken({
        userId: user.id.toString(),
        expiresIn: this.jwtConfiguration.expiresIn.toString(),
        payload: { email: user.email },
      }),
      refreshToken: await this.tokenService.generateToken({
        userId: user.id.toString(),
        expiresIn: '7d',
      }),
    };
  }

  public async refreshToken(refreshToken: string) {
    const payload = await this.tokenService.verifyToken(refreshToken);

    try {
      const user = await this.usersService.findById(payload.sub);

      return {
        accessToken: await this.tokenService.generateToken({
          userId: user.id.toString(),
          payload: { email: user.email },
          expiresIn: this.jwtConfiguration.expiresIn.toString(),
        }),
        refreshToken: await this.tokenService.generateToken({
          userId: user.id.toString(),
          expiresIn: '7d',
        }),
      };
    } catch {
      console.log('Invalid refresh token');
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
