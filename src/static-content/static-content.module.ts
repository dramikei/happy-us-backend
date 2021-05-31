import { Module } from '@nestjs/common';
import { StaticContentService } from './static-content.service';
import { StaticContentController } from './static-content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { registerMongoSchema } from '../utils/register-mongo-schema';
import {
  StaticContent,
  StaticContentSchema,
} from './entities/static-content.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      registerMongoSchema(StaticContentSchema, StaticContent.name),
    ]),
  ],
  controllers: [StaticContentController],
  providers: [StaticContentService],
})
export class StaticContentModule {}
