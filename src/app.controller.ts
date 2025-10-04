import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthType } from './auth/enum/auth-type.enum';
import { Auth } from './auth/decorators/auth/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Auth(AuthType.None)
  getHello(): string {
    return this.appService.getHello();
  }
}
