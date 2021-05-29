import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrphanStepsService } from './orphan-steps.service';
import { CreateOrphanStepDto } from './dto/create-orphan-step.dto';
import { UpdateOrphanStepDto } from './dto/update-orphan-step.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orphan-steps')
@Controller('api/orphan-steps')
export class OrphanStepsController {
  constructor(private readonly orphanStepsService: OrphanStepsService) {}

  @Post()
  create(@Body() createOrphanStepDto: CreateOrphanStepDto) {
    return this.orphanStepsService.create(createOrphanStepDto);
  }

  @Get()
  findAll() {
    return this.orphanStepsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orphanStepsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrphanStepDto: UpdateOrphanStepDto,
  ) {
    return this.orphanStepsService.update(+id, updateOrphanStepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orphanStepsService.remove(+id);
  }
}
