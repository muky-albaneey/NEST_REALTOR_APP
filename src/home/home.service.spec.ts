import { Test, TestingModule } from '@nestjs/testing';
import { HomeService } from './home.service';
import { DatabaseService } from './../database/database.service';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeService,{
        provide : DatabaseService,
        useValue : {
          home : {
            findMany : jest.fn().mockReturnValue([])
          }
        }
      }],
    }).compile();

    service = module.get<HomeService>(HomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getHomes", ()=>{
    it("it should call prisma with many correct params", ()=>{

    })
  })
});

// "adress": "sokoto north",
// "number_of_bedrooms": 2,
// "number_bathrooms": 3,
// "city": "sokoto state",
// "land_size": 100,
// "price":  2000000,
// "propery_type": "CONDO",
// "images" :
