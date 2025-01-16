import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LinkTracker,
  LinkTrackerDocument,
} from 'src/link-tracker/domain/entities/link-tracker.entity';
import { LinkTrackerInterface } from 'src/link-tracker/domain/interfaces/link-tracker-interface';

export class LinkTrackerRepository implements LinkTrackerInterface {
  /**
   *
   * @param linkTrackerModel
   */
  constructor(
    @InjectModel(LinkTracker.name)
    private readonly linkTrackerModel: Model<LinkTrackerDocument>,
  ) {}

  /**
   *
   * @param linktId
   */
  public async all(linktId: string): Promise<LinkTracker[]> {
    const linkTrackers = await this.linkTrackerModel.find({ linkId: linktId });

    return linkTrackers;
  }

  /**
   *
   * @param data
   */
  public async store(data: any): Promise<LinkTracker> {
    const linkTracker = await this.linkTrackerModel.create({
      linkId: data.linkId,
      ip: data.ip,
      userAgent: data.userAgent,
    });

    return linkTracker;
  }

  /**
   *
   * @param linktId
   */
  public async count(linkId: string): Promise<any> {
    return await this.linkTrackerModel.aggregate([
      { $match: { linkId: linkId } },
      {
        $group: {
          _id: '$userAgent',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // return await this.linkTrackerModel.countDocuments({ linkId: linkId });
  }
}
