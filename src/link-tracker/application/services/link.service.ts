import { Injectable } from '@nestjs/common';
import { Link } from 'src/link-tracker/domain/entities/link.entity';
import { CacheLinkRepository } from 'src/link-tracker/infrastructure/repositories/cache-link-repository';

@Injectable()
export class LinkService {
  /**
   *
   */
  public constructor(private readonly linkRepository: CacheLinkRepository) {}

  /**
   *
   * @param data
   * @returns
   */
  public async createLink({ url, password, validUntil }: any) {
    const link = await this.linkRepository.store({
      password,
      url,
      validUntil: validUntil ? validUntil : this.addOneYear(new Date()),
    });

    return link;
  }

  /**
   *
   */
  public async getLink(code: string): Promise<Link> {
    const link = await this.linkRepository.getByCode(code);
    return link;
  }

  /**
   *
   */
  public async invalidateLink(link: Link): Promise<Link> {
    link.valid = false;
    await this.linkRepository.update(link);

    return link;
  }

  /**
   * Adds one year to the current date.
   */
  private addOneYear(date: Date): Date {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }
}
