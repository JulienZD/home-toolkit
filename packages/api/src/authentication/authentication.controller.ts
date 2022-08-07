import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { AuthenticationResult, AuthenticationService } from './authentication.service';
import { RegistrationDto } from './dto/registration.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller({
  path: 'authentication',
  version: VERSION_NEUTRAL,
})
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body(ValidationPipe) data: RegistrationDto): Promise<AuthenticationResult> {
    return this.authenticationService.register(data);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any): Promise<AuthenticationResult> {
    return this.authenticationService.login(req.user);
  }
}
