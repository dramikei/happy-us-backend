import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StaticContentService } from './static-content.service';
import { CreateStaticContentDto } from './dto/create-static-content.dto';
import { UpdateStaticContentDto } from './dto/update-static-content.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('static-content')
@Controller('api/static-content')
export class StaticContentController {
  constructor(private readonly staticContentService: StaticContentService) {}

  @Post()
  create(@Body() createStaticContentDto: CreateStaticContentDto) {
    return this.staticContentService.create(createStaticContentDto);
  }

  @Get()
  getAllSections() {
    return this.staticContentService.getAllSections();
  }

  @Get(':name')
  getOneSection(@Param('name') name: string) {
    return this.staticContentService.getOneSection(name);
  }

  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateStaticContentDto: UpdateStaticContentDto,
  ) {
    return this.staticContentService.update(name, updateStaticContentDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.staticContentService.remove(name);
  }
}
