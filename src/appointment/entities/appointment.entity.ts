import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Appointment {
  @Prop({ required: true })
  email: string;
}

export type AppointmentDocument = Appointment & Document;

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
