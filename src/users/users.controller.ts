import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './providers/users.service';
import { ApiBody } from '@nestjs/swagger';
import { AcessTokenGuard } from 'src/auth/guard/acess-token/acess-token.guard';

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

  @UseGuards(AcessTokenGuard)
  @Post('many')
  @ApiBody({ type: [CreateUserDto] })
  public createManyUsers(@Body() body: CreateUserDto[]) {
    return this.usersService.createManyUsers(body);
  }
}
