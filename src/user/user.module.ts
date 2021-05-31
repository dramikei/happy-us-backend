import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { registerMongoSchema } from '../utils/register-mongo-schema';

@Module({
  imports: [
    // can use this here [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])] if hooks not required
    MongooseModule.forFeatureAsync([
      registerMongoSchema(UserSchema, User.name),
    ]),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
