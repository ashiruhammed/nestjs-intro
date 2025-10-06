import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hasing.provider';
import { BycriptProvider } from './providers/bycript.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwtConfig';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './providers/token.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BycriptProvider,
    },
    TokenService,
  ],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
