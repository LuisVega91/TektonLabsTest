import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  createAt: Date;

  @ApiProperty()
  updateAt: Date;
}
