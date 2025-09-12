import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

export interface User {
  name: string;
  email: string;
  phoneNumber: number;
  id: number;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: 1234567890,
      id: 1,
    },
    {
      name: 'Jane',
      email: 'jane.doe@example.com',
      phoneNumber: 1234567890,
      id: 2,
    },
    {
      name: 'John',
      email: 'john.doe@example.com',
      phoneNumber: 1234567890,
      id: 3,
    },
  ];

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public createUser(user: User) {
    this.users.push(user);
  }

  public getUsers(name?: string) {
    const authenticated = this.authService.isAuthenticated();
    if (!authenticated) {
      throw new UnauthorizedException('Unauthorized');
    }
    if (name) {
      return this.users.filter((user) => user.name === name);
    }

    return this.users;
  }

  public findUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
