import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({ example: 'a@gmail.com', required: true })
  email: string;

  @ApiProperty({ writeOnly: true })
  password: string;
}
