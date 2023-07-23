import {IsString,IsNotEmpty,IsEmail,Matches,MinLength,IsEnum, IsOptional, isString, isNotEmpty} from "class-validator";
import {} from "class-transformer";
import {UserTypes} from "@prisma/client"

export class SignAuthDto{

    @IsString()
    @IsNotEmpty()
    name : string;

    @Matches(/^\+?[1-9][0-9]{7,14}$/, {message : "Please provide a valid phone number"})
    @IsNotEmpty()
    @IsString()
    phoneNumber : string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email : string;

    @MinLength(5)
    @IsString()
    @IsNotEmpty()
    password : string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    productKey ?: string
}

export class SignInDto{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email : string;

    @MinLength(5)
    @IsString()
    @IsNotEmpty()
    password : string
}

export class ProductKeyDto{

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email : string;

    @IsEnum(UserTypes, {message : "Please provide a valid key"})
    userType : UserTypes
}