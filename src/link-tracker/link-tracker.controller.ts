import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Ip,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { LinkTrackerService } from './application/services/link-tracker.service';
import { Response } from 'express';
import { LinkService } from './application/services/link.service';
import { LinkDto } from './application/dto/link-dto';
import { LinkTrackerDto } from './application/dto/link-tracker-dto';

@Controller('l')
export class LinkTrackerController {
  /**
   *
   */
  public constructor(
    private readonly linkService: LinkService,
    private readonly linkTrackerService: LinkTrackerService,
  ) {}

  /**
   *
   * @param body
   */
  @Post()
  public async createLink(@Body() body, @Res() res: Response) {
    const link = await this.linkService.createLink(body);

    return res.status(201).json(LinkDto.fromModel(link));
  }

  /**
   *
   * @param body
   */
  @Get('/:code')
  public async linkTracker(
    @Req() request: Request,
    @Ip() ip,
    @Param('code') code: string,
    @Query('password') password: string,
    @Res() res: Response,
  ) {
    const link = await this.linkService.getLink(code);
    if (!link || !link.valid || link.validUntil < new Date()) {
      return res.status(HttpStatus.NOT_FOUND).send('<p>Link not found</p>');
    }

    if (link.password && link.password !== password) {
      return res.status(HttpStatus.UNAUTHORIZED).send('<p>Unauthorized</p>');
    }

    await this.linkTrackerService.tracker(link, {
      ip,
      userAgent: request.headers['user-agent'],
    });

    return res.redirect(HttpStatus.FOUND, link.url);
  }

  /**
   *
   * @param code
   * @returns
   */
  @Post('/:code/invalidate')
  public async invalidate(@Param('code') code: string) {
    const link = await this.linkService.getLink(code);

    if (!link) {
      return {
        message: 'Link not found',
      };
    }

    await this.linkService.invalidateLink(link);

    return {
      message: 'Link invalidated',
    };
  }

  /**
   *
   * @param body
   */
  @Get('/:code/stats')
  public async stats(@Param('code') code: string) {
    const link = await this.linkService.getLink(code);
    const stats = await this.linkTrackerService.count(link._id.toString());
    const items = await this.linkTrackerService.all(link._id.toString());

    return {
      stats: {
        userAgent: stats,
        total: stats.reduce((acc, curr) => acc + curr.count, 0),
      },
      items: items.map((item) => LinkTrackerDto.fromModel(item)),
    };
  }
}
