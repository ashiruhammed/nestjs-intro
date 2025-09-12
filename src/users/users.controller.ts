import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // name, email and phone number

  @Post()
  public createUser(@Body(new ValidationPipe()) body: CreateUserDto) {
    return body;
  }

  @Get()
  public getUsers(@Query() query: QueryUserDto) {
    return this.usersService.getUsers(
      query.name,
      query.email,
      query.page,
      query.limit,
    );
  }
}
