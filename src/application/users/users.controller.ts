import { PayloadToken } from './../../server/auth/models/token.model';
import { UserRoles } from './constants/user-roles.constant';
import { ApiKeyGuard } from './../../server/auth/guards/api-key.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { USERS, USERS_CAPITALIZED } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/server/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/server/auth/guards/roles.guard';
import { Song } from './../songs/entities/song.entity';
import { User } from './entities/user.entity';
import { V1 } from './../../server/routes/routes.constants';
import { Roles } from 'src/server/auth/decorators/roles.decorator';
import { Request } from 'express';

//@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags(USERS_CAPITALIZED)
@Controller(`${V1}/${USERS}`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.Admin)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  findMe(@Req() req: Request & { user }): Promise<User> {
    const user = req.user as PayloadToken;
    return this.usersService.findById(user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.Admin)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Patch('/me')
  updateMe(
    @Req() req: Request & { user },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = req.user as PayloadToken;
    return this.usersService.update(user.sub, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.Admin)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.Admin)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ affected: number }> {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('suggest-me/:id')
  suggestMe(@Param('id') id: number): Promise<Song[]> {
    return this.usersService.suggestMe(id);
  }
}
