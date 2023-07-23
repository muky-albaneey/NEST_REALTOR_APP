import { NestInterceptor, ExecutionContext, CallHandler,ConflictException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";


// export class UserInterceptor implements NestInterceptor {
//        async intercept(
//             context : ExecutionContext, handler : CallHandler
//             )
//             {
//                 const   request =context.switchToHttp().getRequest();

//                 const token = request?.headers?.authorization?.split("Bearer ")[1];
//                 const users = jwt.decode(token)
                                 
//                 console.log({users})                        
//                 return handler.handle()
//             }
// }

export class UserInterceptor implements NestInterceptor{

   async intercept(context : ExecutionContext, handler : CallHandler) {
        
        const request = context.switchToHttp().getRequest();
        const token = request?.headers?.authorization?.split("Bearer ")[1]
        
        const user = await jwt.decode(token);
        request.user = user
        
        console.log({user});
        return handler.handle()

    }
}