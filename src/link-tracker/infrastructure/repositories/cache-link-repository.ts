import { InjectRedis } from '@nestjs-modules/ioredis';
import { Link } from 'src/link-tracker/domain/entities/link.entity';
import { LinkInterface } from 'src/link-tracker/domain/interfaces/link-interface';
import Redis from 'ioredis';
import { LinkRepository } from './link-repository';

export class CacheLinkRepository implements LinkInterface {
  /**
   *
   * @param linkModel
   */
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly linkRepository: LinkRepository,
  ) {}

  /**
   *
   */
  async all(): Promise<any> {
    return this.linkRepository.all();
  }

  /**
   *
   * @param id
   * @returns
   */
  async getByID(id: string): Promise<Link> {
    const link = await this.linkRepository.getByID(id);

    return link;
  }

  /**
   *
   * @param code
   */
  async getByCode(code: string): Promise<Link> {
    const linkJson = await this.redis.get(this.getCacheId(code));

    if (!linkJson) {
      const link = await this.linkRepository.getByCode(code);
      // add ttl to cache
      await this.redis.set(this.getCacheId(link), this.serialize(link));

      return link;
    }

    return this.deserialize(linkJson);
  }

  /**
   *
   * @param data
   * @param user
   */
  async store({ url, password, validUntil }): Promise<Link> {
    const link = await this.linkRepository.store({ url, password, validUntil });

    await this.redis.set(this.getCacheId(link), this.serialize(link));
    return link;
  }

  /**
   *
   */
  async update(link: Link): Promise<Link> {
    await this.linkRepository.update(link);

    await this.redis.del(this.getCacheId(link));
    await this.redis.set(this.getCacheId(link), this.serialize(link));

    return link;
  }

  /**
   *
   * @param value
   * @returns
   */
  private serialize(value: Link): string {
    return JSON.stringify(value);
  }

  /**
   *
   */
  private deserialize(value: string): Link {
    const data = JSON.parse(value);

    const link = new Link();
    link._id = data._id;
    link.valid = data.valid;
    link.code = data.code;
    link.url = data.url;
    link.password = data.password;
    link.validUntil = new Date(data.validUntil);

    return link;
  }

  /**
   *
   */
  private getCacheId(link: Link | string): string {
    if (typeof link === 'string') {
      return `link:${link}`;
    }

    return `link:${link.code}`;
  }
}
