import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { UserSerializer } from './serializers/user.serializer';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { DoesUserExist } from 'src/auth/guards/unique_email.guards';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create New User' })
  @ApiCreatedResponse({ description: 'User Created' })
  @Post()
  @UseGuards(DoesUserExist)
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get the user profile data' })
  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async profile(@Request() req) {
    //Here the returned Object is Serialized Object based on defined rules in dto
    return new UserSerializer(req.user);
  }
}
