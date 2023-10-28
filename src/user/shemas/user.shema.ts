import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { UserCreateDto } from '../dto/user.create.dto';
import * as bcrypt from 'bcryptjs';
import { UserResponseDto } from '../dto/user.response.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    static createFromDto(dto: UserCreateDto): User {
        const user = new User();
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.email = dto.email;
        user.password = bcrypt.hashSync(dto.password, 10);
        user.roles = dto.roles;
        user._id = uuidv4();
        user.createdAt = new Date();
        return user;
    }

    static convertToUserResponseDto(user: User): UserResponseDto {
        const userResult: UserResponseDto = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles,
        }
        return userResult;
    }

    @Prop({ default: uuidv4, type: String })
    _id: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop([String])
    roles: string[];

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: 0 })
    __v: number;
};

export const UserSchema = SchemaFactory.createForClass(User);
