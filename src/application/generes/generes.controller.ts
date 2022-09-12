import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GeneresService } from './generes.service';
import { CreateGenereDto } from './dto/create-genere.dto';
import { UpdateGenereDto } from './dto/update-genere.dto';

@Controller('generes')
export class GeneresController {
  constructor(private readonly generesService: GeneresService) {}

  @Post()
  create(@Body() createGenereDto: CreateGenereDto) {
    return this.generesService.create(createGenereDto);
  }

  @Get()
  findAll() {
    return this.generesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenereDto: UpdateGenereDto) {
    return this.generesService.update(+id, updateGenereDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generesService.remove(+id);
  }
}
