import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthInfo, GetAuthInfo } from '../auth/auth.middleware';

@ApiTags('volunteer')
@Controller('api/volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Get()
  findAll() {
    return this.volunteerService.findAll();
  }

  // only admin can update details
  @Patch()
  update(
    @GetAuthInfo() authInfo: AuthInfo,
    @Body() updateVolunteerDto: UpdateVolunteerDto,
  ) {
    return this.volunteerService.update(authInfo.id, updateVolunteerDto);
  }

  @Delete()
  remove(@GetAuthInfo() authInfo: AuthInfo) {
    return this.volunteerService.remove(authInfo.id);
  }
}
