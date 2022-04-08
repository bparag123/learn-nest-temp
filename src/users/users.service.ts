import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto = { ...createUserDto, password: hashedPassword };
      return this.userModel.create(createUserDto);
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
