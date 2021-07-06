import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthInfo, GetAuthInfo } from '../auth/auth.middleware';
import { ApiBaseResponse } from '../utils/api-base-response';
import { Volunteer } from './entities/volunteer.entity';

@ApiTags('volunteer')
@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Get()
  @ApiBaseResponse({ model: Volunteer, sendTokens: true })
  @ApiBearerAuth()
  findOne(@GetAuthInfo() authInfo: AuthInfo) {
    return this.volunteerService.findOne(authInfo.id);
  }

  @Get('all')
  @ApiBaseResponse({ model: Volunteer, oneOfUserTypes: false, isArray: true })
  findAll() {
    return this.volunteerService.findAll();
  }

  // can only be updated with admin permission
  @Patch()
  @ApiBearerAuth()
  @ApiBaseResponse({ model: Volunteer, sendTokens: true })
  update(
    @GetAuthInfo() authInfo: AuthInfo,
    @Body() updateVolunteerDto: UpdateVolunteerDto,
  ) {
    return this.volunteerService.update(authInfo.id, updateVolunteerDto);
  }

  // can only be deleted with admin permission
  @Delete()
  @ApiBearerAuth()
  @ApiBaseResponse({ model: Volunteer })
  remove(@GetAuthInfo() authInfo: AuthInfo) {
    return this.volunteerService.remove(authInfo.id);
  }
}
