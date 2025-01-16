import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Link,
  LinkDocument,
} from 'src/link-tracker/domain/entities/link.entity';
import { LinkInterface } from 'src/link-tracker/domain/interfaces/link-interface';

export class LinkRepository implements LinkInterface {
  /**
   *
   * @param linkModel
   */
  constructor(
    @InjectModel(Link.name)
    private readonly linkModel: Model<LinkDocument>,
  ) {}

  /**
   *
   */
  async all(): Promise<any> {
    const linkTrackers = await this.linkModel.find();

    return linkTrackers;
  }

  /**
   *
   * @param id
   * @returns
   */
  async getByID(id: string): Promise<Link> {
    const link = await this.linkModel.findOne({ _id: id });

    return link;
  }

  /**
   *
   * @param code
   */
  async getByCode(code: string): Promise<Link> {
    const link = await this.linkModel.findOne({ code: code });

    return link;
  }

  /**
   *
   * @param data
   * @param user
   */
  async store({ url, password, validUntil }): Promise<Link> {
    const code = await this.generateCode();

    const link = await this.linkModel.create({
      code,
      password,
      url,
      validUntil,
      valid: true,
    });

    return link;
  }

  /**
   *
   */
  async update(link: Link): Promise<Link> {
    await this.linkModel.updateOne({ _id: link._id }, link);

    return link;
  }

  /**
   *
   * @returns
   */
  private async generateCode(): Promise<string> {
    for (let i = 0; i < 20; i++) {
      const code = this.generateRandomCode(6);
      const link = await this.linkModel.findOne({ code: code });

      if (!link) {
        return code;
      }
    }

    throw new Error('Cannot generate code');
  }

  /**
   *
   * @param length
   * @returns
   */
  private generateRandomCode(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars.charAt(randomIndex);
    }

    return result;
  }
}
