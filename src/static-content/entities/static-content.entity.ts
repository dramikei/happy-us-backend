import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class StaticContent {
  @Prop({ required: true })
  email: string;
}

export type StaticContentDocument = StaticContent & Document;

export const StaticContentSchema = SchemaFactory.createForClass(StaticContent);
