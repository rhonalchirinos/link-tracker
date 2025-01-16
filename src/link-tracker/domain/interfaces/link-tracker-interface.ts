import { LinkTracker } from '../entities/link-tracker.entity';

export interface LinkTrackerInterface {
  all(linktId: string): Promise<LinkTracker[]>;
  store(data: any): Promise<LinkTracker>;
  count(linktId: string): Promise<any>;
}
