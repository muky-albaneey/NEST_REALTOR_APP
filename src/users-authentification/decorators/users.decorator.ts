import {createParamDecorator,ExecutionContext} from "@nestjs/common";

export interface usersValid { name: string, id: number, iat:number, exp: number };

export const User = createParamDecorator((dat, context : ExecutionContext,)=>{
    const request = context.switchToHttp().getRequest();

    return request.user
})