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

  public getUsers(
    name?: string,
    email?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const authenticated = this.authService.isAuthenticated();
    if (!authenticated) {
      throw new UnauthorizedException('Unauthorized');
    }

    let filteredUsers = this.users;

    // Filter by name if provided
    if (name) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    // Filter by email if provided
    if (email) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.toLowerCase().includes(email.toLowerCase()),
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      total: filteredUsers.length,
      page,
      limit,
      totalPages: Math.ceil(filteredUsers.length / limit),
    };
  }

  public findUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
