import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  Length,
} from 'class-validator';

export enum UserSocial {
  Snapchat = 'Snapchat',
  Discord = 'Discord',
}

export enum AppointmentStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

@Schema()
export class Appointment {
  @IsNotEmpty()
  @IsObject()
  @Prop({ type: Object, required: true })
  userSocial: {
    id: string;
    platform: UserSocial;
  }; // to be displayed to volunteer if accepted

  @IsNotEmpty()
  @IsEnum(AppointmentStatus)
  @Prop({ type: String, required: true })
  status: AppointmentStatus;

  @IsNotEmpty()
  @IsDateString()
  @Prop({ required: true })
  time: Date;

  @Prop({ required: true })
  @IsMongoId()
  userId: string;

  @Prop({ required: true })
  @IsMongoId()
  volunteerId: string;

  @Prop({ required: false })
  @Length(1, 30)
  message: string;
}

export type AppointmentDocument = Appointment & Document;

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
