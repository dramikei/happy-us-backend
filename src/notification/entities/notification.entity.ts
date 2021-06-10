import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema()
export class Notification {
  @IsNotEmpty()
  @IsString()
  @Prop({ type: String, required: true })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ type: String, required: true })
  message: string;
}

export type NotificationDocument = Notification & Document;

export const NotificationSchema = SchemaFactory.createForClass(Notification);
