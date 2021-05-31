import { Injectable } from '@nestjs/common';
import { CreateStaticContentDto } from './dto/create-static-content.dto';
import { UpdateStaticContentDto } from './dto/update-static-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  StaticContent,
  StaticContentDocument,
} from './entities/static-content.entity';

@Injectable()
export class StaticContentService {
  constructor(
    @InjectModel(StaticContent.name)
    private readonly staticContentModel: Model<StaticContentDocument>,
  ) {}

  create(createStaticContentDto: CreateStaticContentDto) {
    return 'This action adds a new StaticContent';
  }

  findAll() {
    return `This action returns all StaticContents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} StaticContent`;
  }

  update(id: number, updateStaticContentDto: UpdateStaticContentDto) {
    return `This action updates a #${id} StaticContent`;
  }

  remove(id: number) {
    return `This action removes a #${id} StaticContent`;
  }
}
