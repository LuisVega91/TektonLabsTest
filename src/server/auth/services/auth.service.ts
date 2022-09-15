import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from './../../../application/users/entities/user.entity';
import { UsersService } from './../../../application/users/users.service';
import { PayloadToken } from './../models/token.model';
import { Crypt } from 'src/common/helpers';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await Crypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user;
        return rta;
      }
    }
    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
