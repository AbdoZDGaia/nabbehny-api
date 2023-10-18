import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './shemas/user.shema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
