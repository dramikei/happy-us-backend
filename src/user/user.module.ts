import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { registerMongoSchema } from '../utils/registerMongoSchema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      registerMongoSchema(UserSchema, User.name),
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
