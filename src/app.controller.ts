import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('version-1')
@Controller({ path: '', version: '1' })
export class AppControllerV1 {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello() + ' This is Version 1';
  }
}

@ApiTags('version-2')
@Controller({ path: '', version: '2' })
export class AppControllerV2 {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello() + ' This is Version 2';
  }
}
