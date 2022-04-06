import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ example: 'a@gmail.com', description: 'Enter Email Id here' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Enter Your Password here' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
