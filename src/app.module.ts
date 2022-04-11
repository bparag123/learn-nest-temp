import { Module } from '@nestjs/common';
import { AppControllerV1, AppControllerV2 } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PostsModule } from './posts/posts.module';
@Module({
  imports: [
    //Setting up the Configuration Module for .env
    ConfigModule.forRoot({ isGlobal: true }),
    //Setting Up the Database Module
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    //Binding the Throttling Module for Rate Limiting
    ThrottlerModule.forRoot({
      //Here this is time in second
      ttl: 60,
      //This is number of requests per given ttl
      limit: 100,
    }),
    PostsModule,
  ],
  controllers: [AppControllerV1, AppControllerV2],
  providers: [
    AppService,
    //This is global setup for Rate limit the requests
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
