import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApointmentService } from './apointment.service';
import { CreateApointmentDto } from './dto/create-apointment.dto';
import { UpdateApointmentDto } from './dto/update-apointment.dto';

@Controller('api/apointment')
export class ApointmentController {
  constructor(private readonly apointmentService: ApointmentService) {}

  @Post()
  create(@Body() createApointmentDto: CreateApointmentDto) {
    return this.apointmentService.create(createApointmentDto);
  }

  @Get()
  findAll() {
    return this.apointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apointmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApointmentDto: UpdateApointmentDto,
  ) {
    return this.apointmentService.update(+id, updateApointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apointmentService.remove(+id);
  }
}
