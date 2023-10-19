import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './shemas/user.shema';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/user.create.dto';
import { UserResponseDto } from './dto/user.response.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) { }

    async create(user: UserCreateDto): Promise<UserResponseDto> {
        const userToBeCreated: User = new User()
        userToBeCreated.firstName = user.firstName
        userToBeCreated.lastName = user.lastName
        userToBeCreated.email = user.email
        userToBeCreated.password = await bcrypt.hash(user.password, 10)
        userToBeCreated.roles = user.roles
        userToBeCreated.createdAt = new Date()

        const createdUser = new this.userModel(userToBeCreated);
        await createdUser.save();
        const { password, createdAt, ...userResult } = createdUser.toJSON();
        return userResult;
    }

    async update(id: string, user: User): Promise<UserResponseDto> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true });
        const { password, createdAt, ...userResult } = updatedUser.toJSON();
        return userResult;
    }

    async findAll(): Promise<UserResponseDto[]> {
        const usersResult: UserResponseDto[] = [];
        const users = await this.userModel.find().exec();
        users.forEach(user => {
            const { password, createdAt, ...result } = user.toJSON();
            usersResult.push(result);
        })
        return usersResult;
    }

    async findOne(id: string): Promise<UserResponseDto> {
        const userFound = await this.userModel.findById({ _id: id }).exec();
        const { password, createdAt, ...userResult } = userFound.toJSON();
        return userResult;
    }

    async findAuthUserByemail(email: string) {
        return await this.userModel.findOne({ email }).exec();
    }
}
