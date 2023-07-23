import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersAuthentificationModule } from './users-authentification/users-authentification.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import {UsersAuthentificationController} from "./users-authentification/users-authentification.controller"
import { HomeModule } from './home/home.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './users-authentification/interceptor/users.interceptor';
import { AuthGuard } from './guards/auth.guard';


@Module({
  
  controllers: [AppController],
  providers: [AppService, DatabaseService,{
    provide : APP_INTERCEPTOR,
    useClass : UserInterceptor
  },{
    provide : APP_GUARD,
    useClass : AuthGuard
  }],
  imports: [UsersAuthentificationModule,DatabaseModule, HomeModule],

})
export class AppModule {}
