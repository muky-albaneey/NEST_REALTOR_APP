import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleDestroy,OnModuleInit{
    
    async onModuleInit() {
        return this.$connect
    }

    async  onModuleDestroy() {
        return this.$disconnect
    }
}



