import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Picnic' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'That was a wonderfull Picnic' })
  @IsString()
  description: string;
}
