import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SONGS, SONGS_CAPITALIZED } from './constants/routes.constants';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongsService } from './songs.service';
import { Song } from './entities/song.entity';
import { V1 } from './../../server/routes/routes.constants';

@ApiTags(SONGS_CAPITALIZED)
@Controller(`${V1}/${SONGS}`)
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

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

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<Song> {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ affected: number }> {
    return this.songsService.remove(id);
  }
}
