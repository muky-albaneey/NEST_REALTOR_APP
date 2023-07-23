import { Test, TestingModule } from '@nestjs/testing';
import { UsersAuthentificationService } from './users-authentification.service';

describe('UsersAuthentificationService', () => {
  let service: UsersAuthentificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersAuthentificationService],
    }).compile();

    service = module.get<UsersAuthentificationService>(UsersAuthentificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

// describe("", ()=>{
//   it("",()=>{

//   })
// })
