import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LinkTrackerDocument = HydratedDocument<LinkTracker>;

@Schema()
export class LinkTracker {
  _id: Types.ObjectId;

  @Prop({ index: true })
  linkId: string;

  @Prop()
  ip: string;

  @Prop()
  userAgent: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const LinkTrackerSchema = SchemaFactory.createForClass(LinkTracker);
