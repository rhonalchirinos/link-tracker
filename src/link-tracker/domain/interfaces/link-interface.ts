import { Link } from '../entities/link.entity';

export interface LinkInterface {
  all(): Promise<any>;
  getByID(id: string): Promise<Link>;
  getByCode(code: string): Promise<Link>;
  store(data: any): Promise<Link>;
  update(link: Link): Promise<Link>;
}
