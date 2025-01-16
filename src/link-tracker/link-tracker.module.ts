import { Module } from '@nestjs/common';
import { LinkTrackerController } from './link-tracker.controller';
import { LinkTrackerService } from './application/services/link-tracker.service';
import { MongooseModule } from '@nestjs/mongoose';

import { LinkTrackerRepository } from './infrastructure/repositories/link-tracker-repository';
import { LinkService } from './application/services/link.service';
import { LinkRepository } from './infrastructure/repositories/link-repository';

import {
  LinkTracker,
  LinkTrackerSchema,
} from './domain/entities/link-tracker.entity';
import { Link, LinkSchema } from './domain/entities/link.entity';
import { CacheLinkRepository } from './infrastructure/repositories/cache-link-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LinkTracker.name, schema: LinkTrackerSchema },
      { name: Link.name, schema: LinkSchema },
    ]),
  ],
  controllers: [LinkTrackerController],
  providers: [
    LinkTrackerService,
    LinkTrackerRepository,
    LinkService,
    LinkRepository,
    CacheLinkRepository,
  ],
})
export class LinkTrackerModule {}
