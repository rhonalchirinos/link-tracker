import { Link } from 'src/link-tracker/domain/entities/link.entity';
import { URL } from 'url';

export class LinkDto {
  target: string;
  link: string;
  valid: boolean;

  /***
   *
   */
  constructor(target: string, link: string, valid: boolean) {
    this.target = target;
    this.link = link;
    this.valid = valid;
  }

  /**
   *
   */
  public static fromModel(link: Link) {
    const { code, password } = link;

    return new this(
      link.url,
      this.buildUrl('http://localhost:3000/l', code, { password }),
      link.valid,
    );
  }

  /**
   *
   */
  private static buildUrl(
    baseUrl: string,
    code?: string,
    params?: Record<string, any>,
  ): string {
    let finalUrl = baseUrl;

    if (code) {
      if (!finalUrl.endsWith('/')) {
        finalUrl += '/';
      }
      finalUrl += code;
    }

    if (params) {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        query.append(key, String(value));
      });
      finalUrl += `?${query.toString()}`;
    }

    return finalUrl;
  }
}
