import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Complaint {
  @Prop({ required: true })
  email: string;
}

export type ComplaintDocument = Complaint & Document;

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
