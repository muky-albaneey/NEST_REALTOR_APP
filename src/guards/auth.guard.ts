import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import  * as jwt from "jsonwebtoken";
import { DatabaseService } from 'src/database/database.service';

interface jwtPayload {
  name : string, id : number, iat : number, exp 
  : number
};

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly reflector : Reflector,
    private readonly connection : DatabaseService
    ){}

  async canActivate(context : ExecutionContext) {

    const roles = this.reflector.getAllAndOverride("roles", [
      context.getHandler(),
      context.getClass()
    ])
    // console.log(roles)
    if(roles?.length){
      //GRAB JWT FROM REQUESR HEADER

      const request = context.switchToHttp().getRequest();

      const token = request?.headers?.authorization?.split("Bearer ")[1]
      
      try {

        const payload = await jwt.verify(token, process.env.JSON_WEB_TOKEN) as jwtPayload;

        const user = await this.connection.user.findUnique({
          where :{id : payload.id }
        });

        // if(!user) return false;
        console.log({token})

        if(roles.includes(user.userType)) {
          return true
        }else{
          return false;
        }
          
        
      // return false;
       
      } catch (error) {
        // return false
      }
    }
    //DETRMINE USERTYPE
    
    //DATABASE REQUEST BY ID
    // DETERMINE IF USER CAN HAVE PERMISSSION

    
   return true
  }
}

