import { Injectable } from '@nestjs/common';
import { CreateGenereDto } from './dto/create-genere.dto';
import { UpdateGenereDto } from './dto/update-genere.dto';

@Injectable()
export class GeneresService {
  create(createGenereDto: CreateGenereDto) {
    return 'This action adds a new genere';
  }

  findAll() {
    return `This action returns all generes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genere`;
  }

  update(id: number, updateGenereDto: UpdateGenereDto) {
    return `This action updates a #${id} genere`;
  }

  remove(id: number) {
    return `This action removes a #${id} genere`;
  }
}
