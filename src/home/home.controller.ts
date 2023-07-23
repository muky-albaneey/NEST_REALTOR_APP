import { Controller, Post,Body, Get, Query, Param, ParseIntPipe, Put, Delete, UnauthorizedException, UseGuards } from '@nestjs/common';
import {CreateHomeDto,HomeDto,UpdateHomeDto,HomeInquireDto} from "./dto/home.dto";
import { HomeService } from './home.service';
import {User,usersValid} from "../users-authentification/decorators/users.decorator";
import {Property, UserTypes} from "@prisma/client";
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorators';


@Controller('home')
export class HomeController {

    constructor (private readonly homeservices : HomeService){}
    
    @Get()
    getHomes(
        @Query('city') city?: string,
        @Query('minprice') minprice?:string,
        @Query('maxprice') maxprice?:string,
        @Query('propery_type') propery_type?:Property,
    ) : Promise <HomeDto[]>{

        const price = minprice || maxprice ? {
            ...(minprice && {lte: parseFloat(minprice)}),
            ...(maxprice && {gte: parseFloat(maxprice)}),
        } :undefined

        const filters = {
            ...(city && {city}),
            ...(price && {price}),
            ...(propery_type && {propery_type})
        }
        console.log(
           { city,
            minprice,
            maxprice,
            propery_type}
        )
        return this.homeservices.getHomes(filters)
    }

    @Get(':id')
    getHomesById(@Param('id', ParseIntPipe) id : number){
        return this.homeservices.getHomeById(id)
    }

    @Roles(UserTypes.REALTOR,UserTypes.ADMIN)
    // @UseGuards(AuthGuard)
    @Post('createHome')
    createHome(@Body() body : CreateHomeDto, @User() user : usersValid){
        
        // return this.homeservices.createHome(body,user.id)
        return 44444444
        
    }

    @Roles(UserTypes.REALTOR,UserTypes.ADMIN)
    // @UseGuards(AuthGuard)
    @Put(":id")
    async updateById(@Param('id', ParseIntPipe) id : number, @Body() body :UpdateHomeDto, @User() user : usersValid){
        
        const realtoId = await this.homeservices.getRealtorId(user.id)

        if(realtoId.id !== user.id){
            throw new UnauthorizedException ()
        }

        return this.homeservices.updateHome(id,body)
    }

    @Roles(UserTypes.REALTOR,UserTypes.ADMIN)
    // @UseGuards(AuthGuard)
    @Delete(":id")
    async deleteById(@Param("id", ParseIntPipe) id : number, @User () user : usersValid){

        const realtoId = await this.homeservices.getRealtorId(user.id)

        if(realtoId.id !== user.id){
            throw new UnauthorizedException ()
        }

        return this.homeservices.deleteById(id)
    }

    @Roles(UserTypes.BUYER)
    @Post('/inquiry/:id')
    inquire(
        @Param("id", ParseIntPipe) homeId : number,
        @User() user : usersValid,
        @Body() {message} : HomeInquireDto
    ){
        return this.homeservices.buyerInquire(user, homeId,message);
    }

    @Roles(UserTypes.REALTOR)
    @Get('/mess/:id')
    async getMessages(
        @Param("id", ParseIntPipe) homeId : number,
        @User() user : usersValid,
    ){
        const realtoId = await this.homeservices.getRealtorId(user.id)

        if(realtoId.id !== user.id){
            throw new UnauthorizedException ()
        }

        return this.homeservices.allMessages(homeId)    
    }

}
