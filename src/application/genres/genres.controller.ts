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

import { GENRES, GENRES_CAPITALIZED } from './constants/routes.constants';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { V1 } from './../../server/routes/routes.constants';
import { JwtAuthGuard } from 'src/server/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/server/auth/guards/roles.guard';
import { Roles } from 'src/server/auth/decorators/roles.decorator';
import { UserRoles } from '../users/constants';
import { Public } from 'src/server/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags(GENRES_CAPITALIZED)
@Controller(`${V1}/${GENRES}`)
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Roles(UserRoles.Admin)
  @Post()
  create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genresService.create(createGenreDto);
  }

  @Public()
  @Get()
  findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Genre> {
    return this.genresService.findOne(id);
  }

  @Roles(UserRoles.Admin)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<Genre> {
    return this.genresService.update(id, updateGenreDto);
  }

  @Roles(UserRoles.Admin)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ affected: number }> {
    return this.genresService.remove(id);
  }
}
