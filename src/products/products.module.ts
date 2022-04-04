import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { auth } from './middlewares/auth';
import { Request, Response, NextFunction } from 'express';
import { MyMiddleware } from './middlewares/class-based-';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(auth).forRoutes(ProductsController);
    consumer.apply(MyMiddleware).forRoutes(ProductsController);
    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        console.log('get middleware');
        next();
      })
      .forRoutes({ path: 'products', method: RequestMethod.GET });
  }
}
