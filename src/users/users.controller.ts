import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // name, email and phone number

  @Post()
  public createUser(@Body(new ValidationPipe()) body: CreateUserDto) {
    return body;
  }

  @Get()
  public getUsers(@Query('name') name: string): User[] {
    return this.usersService.getUsers(name);
  }
}
