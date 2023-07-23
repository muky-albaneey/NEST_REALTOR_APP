import { Module } from '@nestjs/common';
import { UsersAuthentificationController } from './users-authentification.controller';
import { UsersAuthentificationService } from './users-authentification.service';
import {DatabaseModule} from "../database/database.module";
import {DatabaseService} from "../database/database.service";

@Module({
  imports : [DatabaseModule],
  controllers: [UsersAuthentificationController],
  providers: [UsersAuthentificationService, DatabaseService]
})
export class UsersAuthentificationModule {}
