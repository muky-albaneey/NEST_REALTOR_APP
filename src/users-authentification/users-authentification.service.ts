import { Injectable,ConflictException,HttpException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {UserTypes} from "@prisma/client"
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";

interface SignUpparams {
    name : string;
    phoneNumber: string;
    email: string;
    password : string;
}


interface signParam {
    email : string;
    password : string;
}

@Injectable()
export class UsersAuthentificationService {

    constructor(private readonly con : DatabaseService){}

    async signupService({name,phoneNumber,email,password} : SignUpparams, userType : UserTypes ){

        const checkedUserExist = await this.con.user.findUnique({
            where : {
                email
            }
        });

        if(checkedUserExist){
            throw new ConflictException()
        }

        const saltOrRounds = 10;

        const hashed = await bcrypt.hash(password,saltOrRounds);


        const userCreation = await this.con.user.create({
            data :{
                name,
                phoneNumber,
                email,
                password :hashed,
                userType : userType
            }
        });

        const jwtApi = await this.generateJwt(userCreation.name, userCreation.id);
        return jwtApi;

    }

    async signingIn({email,password} : signParam){

       const findUser = await this.con.user.findUnique({
            where : {
                email
            }
        });

        if(!findUser){
            throw new ConflictException()
        }

        const hasedPass = findUser.password;

        const validation = bcrypt.compare(password,hasedPass);

        if(!validation){
            throw  new HttpException ("invalid details", 400);
        }

        const jwtApi = await this.generateJwt(findUser.name, findUser.id);
        return jwtApi;
    }

    private generateJwt(name : string, id: number){

        const jsonInfo = {name, id};
        const expires = {expiresIn : 37000};

        const jsonWeb =  jwt.sign(
            jsonInfo,
            process.env.JSON_WEB_TOKEN,
            expires
      );

      return jsonWeb;
    }

    productKeyGeneration(email : string, usertype : UserTypes){
        
        const stringGeneration = `${email}-${usertype}-${process.env.KEY}`
        const saltOrRounds = 10;
        
        const keytoken =  bcrypt.hash(stringGeneration,saltOrRounds);

        return keytoken;

    }

}
