import { Exclude } from 'class-transformer';

export class UserSerializer {
  email: string;
  @Exclude()
  password: string;

  constructor(partial: Partial<UserSerializer>) {
    Object.assign(this, partial);
  }
}
