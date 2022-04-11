import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';

//This guard is used to set the account with unique email
@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    //Finding the user with the given email
    const userExist = await this.userService.findByEmail(request.body.email);
    if (userExist) {
      throw new ForbiddenException('This email already exist');
    }
    return true;
  }
}
