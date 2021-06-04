import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsArray, IsDateString, IsNotEmpty, IsObject } from 'class-validator';

@Schema()
export class StaticContent {
  @IsNotEmpty()
  @Prop({ required: true })
  name: string;

  @IsNotEmpty()
  @Prop({ required: true })
  description: string;

  @IsNotEmpty()
  @IsDateString()
  @Prop({ required: true })
  lastUpdated: Date;

  @IsNotEmpty()
  @IsArray()
  @Prop({ required: true })
  points: string[];

  @IsNotEmpty()
  @IsObject()
  @Prop({ type: Object, required: true })
  meta: Record<string, unknown>;
}

export type StaticContentDocument = StaticContent & Document;

export const StaticContentSchema = SchemaFactory.createForClass(StaticContent);
