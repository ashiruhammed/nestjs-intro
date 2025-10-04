import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthType } from 'src/auth/enum/auth-type.enum';
import { AcessTokenGuard } from '../acess-token/acess-token.guard';

@Injectable()
export class AuthenticationGuardGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private authGuardMap: Record<AuthType, CanActivate>;

  constructor(
    private readonly accessTokenGuard: AcessTokenGuard,
    private readonly reflector: Reflector,
  ) {
    // Initialize the authGuardMap in constructor after dependency injection
    this.authGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: {
        canActivate: () => true,
      },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authType = this.reflector.getAllAndOverride('auth', [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuardGuard.defaultAuthType];
    const guards = authType.map((type) => this.authGuardMap[type]).flat();
    for (const guard of guards) {
      console.log('guard', authType, this.authGuardMap, AuthType);
      const canActivate = await Promise.resolve(
        guard.canActivate(context),
      ).catch((error) => {
        throw error;
      });
      if (canActivate) {
        return true;
      }
    }
    return true;
  }
}
