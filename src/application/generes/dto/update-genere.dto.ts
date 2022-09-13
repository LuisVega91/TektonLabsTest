import { PartialType } from '@nestjs/swagger';
import { CreateGenereDto } from './create-genere.dto';

export class UpdateGenereDto extends PartialType(CreateGenereDto) {}
