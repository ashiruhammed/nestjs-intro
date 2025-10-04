import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/providers/users.service';
import jwtConfig from '../config/jwtConfig';
import { UserLoginPayloadDto } from '../dto/user-payload.dto';
import { HashingProvider } from './hasing.provider';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,

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
      access_token: await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.expiresIn.toString(),
        },
      ),
    };
  }
}
