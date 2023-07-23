import { Body, Controller, Post,Param,ParseEnumPipe,ConflictException,Get } from '@nestjs/common';
import {UsersAuthentificationService} from "./users-authentification.service";
import {UserTypes} from "@prisma/client";
import {SignAuthDto,ProductKeyDto,SignInDto} from "./dto/Auth.dto"
import * as bcrypt from 'bcrypt';
import { User, usersValid } from './decorators/users.decorator';


@Controller('users')
export class UsersAuthentificationController {

    constructor(private readonly userservice : UsersAuthentificationService){}


    @Post('signup/:usertype')
        signup(@Body () body :SignAuthDto, @Param('usertype', new ParseEnumPipe(UserTypes)) usertype : UserTypes){

            if(usertype !== UserTypes.BUYER){
                if(!body.productKey){
                    throw new ConflictException("PRODUCT KEY NEEDED!")
                }

                const isValid = `${body.email}-${usertype}-${process.env.KEY}`;
                
                bcrypt.compare(isValid, body.productKey);
            }

        return this.userservice.signupService(body, usertype);
        
    }

    @Post('signin')
    signIn(@Body() body :SignInDto){
        return this.userservice.signingIn(body);
    }

    
    @Post('/key')
    generateKey(@Body() body : ProductKeyDto){
        return this.userservice.productKeyGeneration(body.email,body.userType)
    }

    @Get("/me")
    me(@User() user : usersValid){
        return user;
    }


}
