import { V1 } from './../../routes/routes.constants';
import { AUTH, AUTH_CAPITALIZED } from './../constants/router.constants';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './../services/auth.service';
import { User } from 'src/application/users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(AUTH_CAPITALIZED)
@Controller(`${V1}/${AUTH}`)
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request & { user }) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }
}
