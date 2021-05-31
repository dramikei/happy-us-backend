import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('volunteer')
@Controller('api/volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Get()
  findAll() {
    return this.volunteerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volunteerService.findOne(id);
  }

  // only admin can update details
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVolunteerDto: UpdateVolunteerDto,
  ) {
    return this.volunteerService.update(id, updateVolunteerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volunteerService.remove(id);
  }
}
