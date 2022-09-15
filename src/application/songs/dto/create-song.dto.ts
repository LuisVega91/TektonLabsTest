import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsPositive()
  @IsNotEmpty()
  readonly genreId: number;
}
