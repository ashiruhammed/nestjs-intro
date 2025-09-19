import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './providers/users.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // name, email and phone number

  @Post()
  public createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get()
  public findAllUsers() {
    return this.usersService.findAll();
  }

  @Post('many')
  @ApiBody({ type: [CreateUserDto] })
  public createManyUsers(@Body() body: CreateUserDto[]) {
    return this.usersService.createManyUsers(body);
  }
}
