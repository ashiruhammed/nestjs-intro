import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwtConfig';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async generateToken<T>({
    userId,
    expiresIn,
    ...payload
  }: {
    userId: string;
    expiresIn: string;
    payload?: T;
  }) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: expiresIn,
      },
    );
  }

  public async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.secret,
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
