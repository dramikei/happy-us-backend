import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class OrphanSteps {
  @Prop({ required: true })
  email: string;
}

export type OrphanStepsDocument = OrphanSteps & Document;

export const OrphanStepsSchema = SchemaFactory.createForClass(OrphanSteps);
