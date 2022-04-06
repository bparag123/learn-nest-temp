import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserSerializer } from 'src/users/serializers/user.serializer';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  /**
   * This method will run when the guard is called
   * The return value of this method is set as a req.user value
   */
  async validate(payload: any) {
    const user: any = await this.userService.findByEmail(payload.email);
    return new UserSerializer(user.dataValues);
  }
}
