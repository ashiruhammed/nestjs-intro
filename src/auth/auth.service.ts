import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User, UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public isAuthenticated() {
    return true;
  }

  public login(user: User) {
    return this.usersService.createUser(user);
  }
}
