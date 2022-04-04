import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class MyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('This is Class based middleware');
    next();
  }
}
