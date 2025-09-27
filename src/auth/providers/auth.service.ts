import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { UserLoginPayloadDto } from '../dto/user-payload.dto';
import { HashingProvider } from './hasing.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,
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

    return user;
  }
}
