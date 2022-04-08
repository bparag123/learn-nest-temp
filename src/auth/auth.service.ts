import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, userPassword: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(userPassword, user.password);
    if (!isMatch) {
      return null;
    }
    const { password, ...data } = user;
    return data;
  }

  async getToken(user: User) {
    return {
      access_token: this.jwtService.sign({ email: user.email }),
    };
  }
}
