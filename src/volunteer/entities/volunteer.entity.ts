import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Volunteer {
  @Prop({ required: true })
  email: string;
}

export type VolunteerDocument = Volunteer & Document;

export const VolunteerSchema = SchemaFactory.createForClass(Volunteer);
