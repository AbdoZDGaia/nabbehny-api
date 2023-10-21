import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './shemas/user.shema';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/user.create.dto';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) { }

    async create(user: UserCreateDto): Promise<UserResponseDto> {
        const userToBeCreated = User.createFromDto(user);

        const createdUser = new this.userModel(userToBeCreated);
        await createdUser.save();

        const userResult = User.convertToUserResponseDto(createdUser);
        return userResult;
    }

    async update(id: string, user: User): Promise<UserResponseDto> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true });
        if (!updatedUser) {
            return null;
        }
        const userResult = User.convertToUserResponseDto(updatedUser);
        return userResult;
    }

    async findAll(): Promise<UserResponseDto[]> {
        const usersResult: UserResponseDto[] = [];
        const users = await this.userModel.find().exec();
        users.forEach(user => {
            const userResult = User.convertToUserResponseDto(user);
            usersResult.push(userResult);
        });
        return usersResult;
    }

    async findOne(id: string): Promise<UserResponseDto> {
        const userFound = await this.userModel.findById({ _id: id }).exec();
        if (!userFound) {
            return null;
        }
        const userResult = User.convertToUserResponseDto(userFound);
        return userResult;
    }

    async findAuthUserByemail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }
}
