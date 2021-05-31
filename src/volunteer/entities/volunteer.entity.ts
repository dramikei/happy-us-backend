import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from '../../user/entities/user.entity';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

@Schema()
export class Volunteer extends Base {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @ArrayUnique()
  @Prop({ type: [{ type: String }], required: true })
  hobbies: string[];

  @IsNotEmpty()
  @Prop({ type: String, required: true })
  aboutMe: string;

  @IsNotEmpty()
  @Prop({ type: String, required: true })
  imageUrl: string;
}

export type VolunteerDocument = Volunteer & Document;

export const VolunteerSchema = SchemaFactory.createForClass(Volunteer);
