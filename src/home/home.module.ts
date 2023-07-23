import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import {DatabaseModule} from "../database/database.module";
import {DatabaseService} from "../database/database.service";
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports : [DatabaseModule],
  controllers: [HomeController],
  providers: [HomeService, DatabaseService,{
    provide : APP_INTERCEPTOR,
    useClass : ClassSerializerInterceptor
  }]
})
export class HomeModule {}
