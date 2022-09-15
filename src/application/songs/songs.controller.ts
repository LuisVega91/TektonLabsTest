import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SONGS, SONGS_CAPITALIZED } from './constants/routes.constants';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongsService } from './songs.service';
import { JwtAuthGuard } from 'src/server/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/server/auth/guards/roles.guard';
import { Song } from './entities/song.entity';
import { V1 } from './../../server/routes/routes.constants';
import { Roles } from 'src/server/auth/decorators/roles.decorator';
import { UserRoles } from '../users/constants';
import { Public } from 'src/server/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags(SONGS_CAPITALIZED)
@Controller(`${V1}/${SONGS}`)
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Roles(UserRoles.Admin)
  @Post()
  create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Song> {
    return this.songsService.findById(id);
  }

  @Roles(UserRoles.Admin)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<Song> {
    return this.songsService.update(id, updateSongDto);
  }

  @Roles(UserRoles.Admin)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ affected: number }> {
    return this.songsService.remove(id);
  }
}
