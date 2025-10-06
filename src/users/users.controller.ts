import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { AuthType } from 'src/auth/enum/auth-type.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // name, email and phone number

  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
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
