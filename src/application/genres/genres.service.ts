import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { LoggerService } from './../../server/logger/logger.service';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
  ) {
    this.logger.setContext(GenresService.name);
  }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const { name } = createGenreDto;
    this.logger.log('Checking if genre exist...');
    const genreAlreadyExists = !!(await this.genreRepo.count({
      where: { name },
    }));
    if (genreAlreadyExists) {
      this.logger.error('The genre already exists');
      throw new ConflictException('The genre already exists');
    }
    this.logger.log('Creating genre...');
    const newGenre = this.genreRepo.create(createGenreDto);
    await this.genreRepo.save(newGenre);
    this.logger.log('Genre created successfully');
    return newGenre;
  }

  findAll(): Promise<Genre[]> {
    return this.genreRepo.find();
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreRepo.findOne({ where: { id } });
    if (!genre) {
      this.logger.error(`Genre #${id} not found`);
      throw new NotFoundException(`Genre #${id} not found`);
    }
    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const genre = await this.genreRepo.findOne({ where: { id } });
    this.genreRepo.merge(genre, updateGenreDto);
    return this.genreRepo.save(genre);
  }

  async remove(id: number): Promise<{ affected: number }> {
    const { affected } = await this.genreRepo.softDelete(id);
    return { affected };
  }
}
