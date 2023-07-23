import { Test, TestingModule } from '@nestjs/testing';
import { UsersAuthentificationController } from './users-authentification.controller';

describe('UsersAuthentificationController', () => {
  let controller: UsersAuthentificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersAuthentificationController],
    }).compile();

    controller = module.get<UsersAuthentificationController>(UsersAuthentificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
