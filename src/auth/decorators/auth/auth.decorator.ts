import { SetMetadata } from '@nestjs/common';
import { AuthType } from 'src/auth/enum/auth-type.enum';

export const Auth = (...args: AuthType[]) => SetMetadata('auth', args);
