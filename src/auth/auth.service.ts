import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { User } from 'src/users/user.entity';

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
    console.log(user);
    // return this.usersService.createUser(user);
  }
}
