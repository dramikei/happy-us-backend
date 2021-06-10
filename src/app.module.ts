import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ExceptionsFilter } from './utils/exceptions.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { CheckAdminMiddleware } from './utils/check-admin.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    UserModule,
    VolunteerModule,
    PostModule,
    AppointmentModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    MongooseModule.forRoot(
      process.env.APP_ENV === 'DEV'
        ? process.env.DEV_DB_URL
        : process.env.PROD_DB_URL,
      { useFindAndModify: false },
    ),
    AuthModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      'api/auth/changePassword',
      'api/appointment',
      'api/notification',
      'api/user',
      'api/post/user',
      {
        path: 'api/post',
        method: RequestMethod.POST,
      },
      {
        path: 'api/post',
        method: RequestMethod.PATCH,
      },
      {
        path: 'api/post',
        method: RequestMethod.DELETE,
      },
    );
    consumer
      .apply(CheckAdminMiddleware)
      .forRoutes('api/volunteer', 'api/static-content');
  }
}
