import { Property, UserTypes } from "@prisma/client";
import {Exclude,Expose, Type} from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested, } from "class-validator";


export class HomeDto {

    id: number;

    adress : string;

    // @Exclude()
    number_of_bedrooms: number;

    @Expose({name : "numberOfBedrooms"})
    numberOfBedrooms(){
        return this.numberOfBedrooms;
    }

    // @Exclude()
    number_bathrooms: number;

    @Expose({name: "numberOfBathroom"})
    numberOfBathrooms(){
        return this.numberOfBathrooms;
    }

    city :string;

    @Exclude()
    listed_date: Date;

    @Expose({name : "listedDate"})
    listedDate(){
        return this.listedDate;
    }

    price: number;

    image : string;
    
    @Exclude()
    land_size : number;

    @Expose({name : "landSize"})
    landSize(){
        return this.landSize;
    }
    
    propery_type : Property;
    @Expose({name: "propertyType"})
    propertyType(){
        return this.propertyType;
    }

    @Exclude()
    updated_at : Date;

    @Exclude()
    created_at : Date;

    @Exclude()
    relator_id : number;

    constructor(partial : Partial<HomeDto>){
        Object.assign(this, partial)
    }
}

class Image{
    @IsString()
    @IsNotEmpty()
    url : string;
}

export class CreateHomeDto{

    @IsString()
    @IsNotEmpty()
    adress : string;

    
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    number_of_bedrooms : number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    number_bathrooms : number;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    land_size : number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price: number;

    @IsEnum(Property)
    propery_type: Property;

    @IsArray()
    @ValidateNested({each : true})
    @Type(()=>Image)
    images : Image[]
}


export class UpdateHomeDto{
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    adress?: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    number_of_bedrooms ?: number;
    
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    number_bathrooms ?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    city?: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    land_size ?: number;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price?: number;

    @IsOptional()    
    @IsEnum(Property)
    propery_type?: Property;

    // @IsOptional()    
    // @IsArray()
    // @ValidateNested({each : true})
    // @Type(()=>Image)
    // images ?: Image[]
}
export class HomeInquireDto {

    
    
    @IsString()
    @IsNotEmpty()
    message
}