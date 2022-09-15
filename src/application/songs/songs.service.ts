import { Genre } from './../genres/entities/genre.entity';
import { Song } from './entities/song.entity';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { LoggerService } from './../../server/logger/logger.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongsService {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
    @InjectRepository(Song) private songRepo: Repository<Song>,
  ) {
    this.logger.setContext(SongsService.name);
  }

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const { name, genreId } = createSongDto;

    this.logger.log('Checking if song exist...');
    const songAlreadyExists = !!(await this.songRepo.count({
      where: { name },
    }));
    if (songAlreadyExists) {
      this.logger.error('The song already exists');
      throw new ConflictException('The song already exists');
    }

    this.logger.log('Checking if genre exist...');
    const genre = await this.genreRepo.findOne({ where: { id: genreId } });
    if (!genre) {
      this.logger.error(`Genre #${genreId} not found`);
      throw new NotFoundException(`Genre #${genreId} not found`);
    }

    this.logger.log('Creating song...');
    const newSong = this.songRepo.create(createSongDto);
    newSong.genre = genre;
    await this.songRepo.save(newSong);
    this.logger.log('Song created successfully');
    return newSong;
  }

  findAll(): Promise<Song[]> {
    return this.songRepo.find({
      relations: [Song.relations.genre],
    });
  }

  async findById(id: number): Promise<Song> {
    const song = await this.songRepo.findOne({
      where: { id },
      relations: [Song.relations.genre],
    });
    if (!song) {
      this.logger.error(`Song #${id} not found`);
      throw new NotFoundException(`Song #${id} not found`);
    }
    return song;
  }

  async findByGenreId(genreId: number): Promise<Song[]> {
    const songs = await this.songRepo.find({
      where: { genre: { id: genreId } },
      relations: [Song.relations.genre],
    });
    return songs;
  }

  async update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
    const song = await this.songRepo.findOne({
      where: { id },
      relations: [Song.relations.genre],
    });
    if (updateSongDto.genreId) {
      const genre = await this.genreRepo.findOne({
        where: { id: updateSongDto.genreId },
      });
      song.genre = genre;
    }
    this.songRepo.merge(song, updateSongDto);
    return this.songRepo.save(song);
  }

  async remove(id: number): Promise<{ affected: number }> {
    const { affected } = await this.songRepo.softDelete(id);
    return { affected };
  }
}
