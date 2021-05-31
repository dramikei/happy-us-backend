import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AccessBlacklist,
  AccessBlacklistSchema,
  RefreshRevoked,
  RefreshRevokedSchema,
} from './entities/auth.entity';
import { UserModule } from '../user/user.module';
import { VolunteerModule } from '../volunteer/volunteer.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccessBlacklist.name, schema: AccessBlacklistSchema },
    ]),
    MongooseModule.forFeature([
      { name: RefreshRevoked.name, schema: RefreshRevokedSchema },
    ]),
    UserModule,
    VolunteerModule,
  ],
  controllers: [AuthController],
  exports: [MongooseModule, AuthService],
  providers: [AuthService],
})
export class AuthModule {}
