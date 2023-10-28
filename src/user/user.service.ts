import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './shemas/user.shema';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/user.create.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import Constants from 'src/shared/constants';

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
            throw new NotFoundException(Constants.USER.USER_NOT_FOUND);
        }
        const userResult = User.convertToUserResponseDto(updatedUser);
        return userResult;
    }

    async updatePassword(id: string, newPassword: string): Promise<void> {
        const userFound = this.userModel.findById(id).exec();
        if (!userFound) {
            throw new NotFoundException(Constants.USER.USER_NOT_FOUND);
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(id, { $set: { password: newPassword } }, { new: true });
        if (!updatedUser) {
            throw new BadRequestException(Constants.AUTH.ERROR_UPDATING_PASSWORD);
        }
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
            throw new NotFoundException(Constants.USER.USER_NOT_FOUND);
        }
        const userResult = User.convertToUserResponseDto(userFound);
        return userResult;
    }

    async findAuthUserByemail(email: string): Promise<User> {
        const userFound = await this.userModel.findOne({ email }).exec();
        if (!userFound) {
            throw new NotFoundException(Constants.USER.USER_NOT_FOUND);
        }
        return userFound;
    }
}
