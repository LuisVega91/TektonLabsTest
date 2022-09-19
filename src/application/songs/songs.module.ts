import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { Song } from './entities/song.entity';
import { GenresModule } from '../genres/genres.module';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), GenresModule],
  controllers: [SongsController],
  providers: [SongsService],
  exports: [TypeOrmModule],
})
export class SongsModule {}
