import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ example: 'Picnic' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'That was a wonderfull Picnic' })
  @IsString()
  description: string;
}
