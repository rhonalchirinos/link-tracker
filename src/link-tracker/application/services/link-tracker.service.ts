import { Injectable } from '@nestjs/common';
import { LinkTracker } from 'src/link-tracker/domain/entities/link-tracker.entity';
import { Link } from 'src/link-tracker/domain/entities/link.entity';
import { LinkTrackerRepository } from 'src/link-tracker/infrastructure/repositories/link-tracker-repository';

@Injectable()
export class LinkTrackerService {
  /**
   *
   */
  public constructor(
    private readonly linkTrackerRepository: LinkTrackerRepository,
  ) {}

  /**
   *
   */
  public async tracker(link: Link, { ip, userAgent }): Promise<LinkTracker> {
    const linkTracker = await this.linkTrackerRepository.store({
      linkId: link._id,
      ip,
      userAgent,
      date: new Date(),
    });

    return linkTracker;
  }

  /**
   *
   */
  public async all(linktId: string): Promise<LinkTracker[]> {
    const links = await this.linkTrackerRepository.all(linktId);

    return links;
  }

  /**
   *
   */
  public async count(linktId: string): Promise<any> {
    const links = await this.linkTrackerRepository.count(linktId);

    return links;
  }
}
