import { Test, TestingModule } from '@nestjs/testing';
import { MetaOptionController } from './meta-option.controller';

describe('MetaOptionController', () => {
  let controller: MetaOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetaOptionController],
    }).compile();

    controller = module.get<MetaOptionController>(MetaOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
