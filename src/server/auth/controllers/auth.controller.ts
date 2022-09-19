import { V1 } from './../../routes/routes.constants';
import { AUTH, AUTH_CAPITALIZED } from './../constants/router.constants';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './../services/auth.service';
import { User } from 'src/application/users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@ApiTags(AUTH_CAPITALIZED)
@Controller(`${V1}/${AUTH}`)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): { access_token: string; user: User } {
    const user = req.user as User;

    return this.authService.generateJWT(user);
  }
}
