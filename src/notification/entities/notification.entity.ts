import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

@Schema()
export class Notification {
  @IsNotEmpty()
  @IsString()
  @Prop({ type: String, required: true })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ type: String, required: true })
  redirectTo: string; // appointments/{appointment_id}

  @IsNotEmpty()
  @IsString()
  @Prop({ type: String, required: true })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ type: String, required: true })
  description: string;

  @IsNotEmpty()
  @IsDateString()
  @Prop({ required: true })
  time: Date;
}

export type NotificationDocument = Notification & Document;

export const NotificationSchema = SchemaFactory.createForClass(Notification);
