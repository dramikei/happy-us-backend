import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrphanStepsModule } from './orphan-steps/orphan-steps.module';
import { PostModule } from './post/post.module';
import { ComplaintModule } from './complaint/complaint.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    UserModule,
    VolunteerModule,
    PostModule,
    AppointmentModule,
    ComplaintModule,
    OrphanStepsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
