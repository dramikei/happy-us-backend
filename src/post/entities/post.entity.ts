import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  Length,
} from 'class-validator';

@Schema()
export class Post {
  @IsNotEmpty()
  @Length(20)
  @Prop({ required: true })
  content: string;

  @IsNotEmpty()
  @Length(1, 20)
  @Prop({ required: true })
  heading: string;

  @IsNotEmpty()
  @IsDateString()
  @Prop({ required: true })
  time: Date;

  @IsNotEmpty()
  @IsMongoId()
  @Prop({ required: true })
  creatorId: string;

  @IsNotEmpty()
  @IsArray()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  likedBy: string[];
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
