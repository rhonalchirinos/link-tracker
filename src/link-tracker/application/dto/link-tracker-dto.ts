import { LinkTracker } from 'src/link-tracker/domain/entities/link-tracker.entity';

export class LinkTrackerDto {
  ip: string;
  userAgent: string;
  date: Date;

  /***
   *
   */
  constructor(ip: string, userAgent: string, date: Date) {
    this.ip = ip;
    this.userAgent = userAgent;
    this.date = date;
  }

  /**
   *
   */
  public static fromModel(linkTracker: LinkTracker) {
    return new this(linkTracker.ip, linkTracker.userAgent, linkTracker.date);
  }
}
