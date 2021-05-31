import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrphanStepsModule } from './orphan-steps/orphan-steps.module';
import { PostModule } from './post/post.module';
import { ComplaintModule } from './complaint/complaint.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './utils/exceptions.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { CheckAdminMiddleware } from './utils/check-admin.middleware';

@Module({
  imports: [
    UserModule,
    VolunteerModule,
    PostModule,
    AppointmentModule,
    ComplaintModule,
    OrphanStepsModule,
    MongooseModule.forRoot(
      process.env.APP_ENV === 'DEV'
        ? process.env.DEV_DB_URL
        : process.env.PROD_DB_URL,
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: ExceptionsFilter }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('(.*)');
    consumer
      .apply(CheckAdminMiddleware)
      .forRoutes('api/volunteer', 'api/orphan-steps');
  }
}
