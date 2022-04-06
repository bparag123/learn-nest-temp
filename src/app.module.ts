import { Module } from '@nestjs/common';
import { AppControllerV1, AppControllerV2 } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
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
  ],
  controllers: [AppControllerV1, AppControllerV2],
  providers: [AppService],
})
export class AppModule {}
