import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserSerializer } from 'src/users/serializers/user.serializer';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MySecret',
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async validate(payload: any) {
    const user: any = await this.userService.findByEmail(payload.email);
    return new UserSerializer(user.dataValues);
  }
}
