import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './shemas/user.shema';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/user.create.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) { }

    async create(user: UserCreateDto): Promise<User> {
        const userToBeCreated: User = new User()
        userToBeCreated.firstName = user.firstName
        userToBeCreated.lastName = user.lastName
        userToBeCreated.email = user.email
        userToBeCreated.password = user.password
        userToBeCreated.roles = user.roles
        userToBeCreated.createdAt = new Date()

        const createdUser = new this.userModel(userToBeCreated);
        return createdUser.save();
    }

    async update(id: string, user: User): Promise<User> {
        const updatedUser = this.userModel.findByIdAndUpdate(id, user, { new: true });
        return updatedUser;
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findById({ _id: id }).exec();
    }
}
