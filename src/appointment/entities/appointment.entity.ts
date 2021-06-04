import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsDateString, IsEnum, IsNotEmpty, IsObject } from 'class-validator';

export enum UserSocial {
  Snapchat = 'Snapchat',
  Discord = 'Discord',
}

export enum AppointmentStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejecte = 'Rejecte',
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
  rejectMessage: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  volunteerId: string;

  @Prop({ required: true })
  acceptMessage: string;
}

export type AppointmentDocument = Appointment & Document;

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
