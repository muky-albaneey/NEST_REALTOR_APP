import { Injectable, NotFoundException,  } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import {Property} from "@prisma/client";
import {HomeDto,HomeInquireDto} from "./dto/home.dto";
import { usersValid } from './../users-authentification/decorators/users.decorator';


interface getHomeParams {
    city? : string,
    price? : {
        gte ?:number ,
        lte ?:number    
     },
    propery_type ? : Property
}

interface homeCreationParam{
    
    adress : string,
    number_of_bedrooms: number,
    number_bathrooms : number,
    city : string,
    land_size : number,
    price : number,
    propery_type :Property ,
    images : {url : string}[],
}

interface updteHomeParams{
    adress ?: string,
    number_of_bedrooms ?: number,
    number_bathrooms ?: number,
    city?: string,
    land_size ?: number,
    price?: number,
    propery_type?: Property,
    // images : {url : string}[]
}

@Injectable()
export class HomeService {
    constructor (private readonly con : DatabaseService){}

    async getHomes(filters : getHomeParams) : Promise <HomeDto[]>{
        const homeEnquiry = await this.con.home.findMany({
            select :{
                id : true,
                adress: true,
                number_of_bedrooms: true,
                number_bathrooms: true,
                city: true,
                price: true,
                propery_type : true,
                images: {
                    select :{
                        url : true
                    },
                    take : 1
                }
            },
            where : filters
        })

        if(homeEnquiry.length){
            throw new NotFoundException()
        }

        // const homeArray = homeEnquiry.map((home) => new HomeDto({...home,image : home.images[0].url}))

        //To get rid of array

        const homeArray = homeEnquiry.map((home)=>{
            const fetchHome = {...home,image : home.images[0].url}
            delete fetchHome.images
            return new HomeDto(fetchHome)
        });

        return homeArray;
        
    }

    async createHome({
        adress,
        number_of_bedrooms,
        number_bathrooms,
        city,
        land_size,
        price ,
        propery_type,
        images,
    } :homeCreationParam,id){
        
        const homeCreation  = await this.con.home.create({
            data :{
                adress,
                number_of_bedrooms,
                number_bathrooms,
                city,
                land_size,
                price ,
                propery_type,
                relator_id : id
                
            }
        });

       const imgId = images.map(img =>{
        return {...img, home_id : homeCreation.id}
       });

       await this.con.image.createMany({
        data : imgId
       });

       return new HomeDto (homeCreation);

    }

    async getHomeById(id : number){
        const singleHome = await this.con.home.findUnique({
            select :{
                id : true,
                adress: true,
                number_of_bedrooms: true,
                number_bathrooms: true,
                city: true,
                price: true,
                propery_type : true,
                images: {
                    select :{
                        url : true
                    },
                    take : 1
                }
            },
            where : {id}
        });

        if(!singleHome){
            throw new NotFoundException();
        }

        return new HomeDto(singleHome);
    }

    async updateHome(id, data: updteHomeParams){
        const finUser = await this.con.home.findUnique({
            where : {
                id : id
            }
        });

        if(!finUser){
            throw new NotFoundException()
        }

        const updating = await this.con.home.update({
            where :{
                id : id
            },
            data
        })

        return new HomeDto(updating);
    }


    async deleteById(id){
        const finUser = await this.con.home.findUnique({
            where :{
                id : id
            }
        });
        if(!finUser){
            throw new NotFoundException()
        }
        await this.con.image.deleteMany({
            where : {home_id: id}
        });

        const deleting = await this.con.home.delete({
            where: {
                id : id
            }
        });

        return  "deleted";
    }

    async getRealtorId(id: number){
        
        const realtor  = await this.con.home.findUnique({
            where : {id },
            select : {
                realtor : {
                    select : {
                        id : true,
                        name : true,
                        email : true,
                        phoneNumber : true
                    }
                
                }

            }
        });
       

        if(!realtor){
            throw new NotFoundException();
        }

        return realtor.realtor
    }

    async buyerInquire(user : usersValid, homeId : number, message ){
        const realtorId = await this.getRealtorId(homeId);

        const newMessage = await this.con.message.create({
          data :{
            realtor_id : realtorId.id,
            buyer_id : user.id,
            home_id : homeId,
            message : message
          }
        });

        return newMessage;
        
    }

    allMessages(homeId){
        return this.con.message.findMany({
            where : {
                home_id : homeId
            },
            select : {
                buyer :{
                    select : {
                        id : true,
                        name : true,
                        email : true,
                        phoneNumber : true
                    }
                    

                }
                

            }
        });
    }
}
