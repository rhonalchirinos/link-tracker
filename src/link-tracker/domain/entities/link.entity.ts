import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LinkDocument = HydratedDocument<Link>;

@Schema()
export class Link {
  _id: Types.ObjectId;

  @Prop({ index: true })
  code: string;

  @Prop()
  url: string;

  @Prop()
  validUntil: Date;

  @Prop()
  valid: boolean;

  @Prop()
  password: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
