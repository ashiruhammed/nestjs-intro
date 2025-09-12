import { Injectable } from '@nestjs/common';

export interface User {
  name: string;
  email: string;
  phoneNumber: number;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: 1234567890,
    },
  ];

  public createUser(user: User) {
    this.users.push(user);
  }

  public getUsers(name?: string) {
    if (name) {
      return this.users.filter((user) => user.name === name);
    }

    return this.users;
  }
}
