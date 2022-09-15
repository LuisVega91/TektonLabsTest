import {
  IsEmail,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { UserRoles } from './../constants';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsEnum(Object.values(UserRoles))
  @ApiProperty({ enum: UserRoles })
  readonly role: string;

  @IsArray()
  @IsOptional()
  readonly preferencesIds: number[];
}
