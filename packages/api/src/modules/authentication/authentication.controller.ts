import { Body, Controller, Post, Request, UseGuards, VERSION_NEUTRAL } from '@nestjs/common';
import { AuthenticationResult, AuthenticationService } from './authentication.service';
import { Public } from './decorators/public.decorator';
import { RegistrationDto } from './dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller({
  path: 'authentication',
  version: VERSION_NEUTRAL,
})
@Public()
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() data: RegistrationDto): Promise<AuthenticationResult> {
    return this.authenticationService.register(data);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any): Promise<AuthenticationResult> {
    return this.authenticationService.login(req.user);
  }
}
