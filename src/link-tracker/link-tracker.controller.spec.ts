import { Test, TestingModule } from '@nestjs/testing';
import { LinkTrackerController } from './link-tracker.controller';

describe('LinkTrackerController', () => {
  let controller: LinkTrackerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkTrackerController],
    }).compile();

    controller = module.get<LinkTrackerController>(LinkTrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
