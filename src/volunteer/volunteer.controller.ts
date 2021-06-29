import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthInfo, GetAuthInfo } from '../auth/auth.middleware';

@ApiTags('volunteer')
@Controller('api/volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Get()
  @ApiBearerAuth()
  findOne(@GetAuthInfo() authInfo: AuthInfo) {
    return this.volunteerService.findOne(authInfo.id);
  }

  @Get('all')
  findAll() {
    return this.volunteerService.findAll();
  }

  // can only be updated with admin permission
  @Patch()
  @ApiBearerAuth()
  update(
    @GetAuthInfo() authInfo: AuthInfo,
    @Body() updateVolunteerDto: UpdateVolunteerDto,
  ) {
    return this.volunteerService.update(authInfo.id, updateVolunteerDto);
  }

  // can only be deleted with admin permission
  @Delete()
  @ApiBearerAuth()
  remove(@GetAuthInfo() authInfo: AuthInfo) {
    return this.volunteerService.remove(authInfo.id);
  }
}
