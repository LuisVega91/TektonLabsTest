import { Injectable } from '@nestjs/common';

import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { LoggerService } from './../../server/logger/logger.service';

@Injectable()
export class SongsService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext(SongsService.name);
  }

  create(createSongDto: CreateSongDto) {
    this.logger.log('This action adds a new song');
    return 'This action adds a new song';
  }

  findAll() {
    return `This action returns all songs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} song`;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
