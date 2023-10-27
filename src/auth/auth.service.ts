import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { UserResponseDto } from 'src/user/dto/user.response.dto';
import { User } from 'src/user/shemas/user.shema';
import { RegisterDto } from './dto/register.dto';
import { UserCreateDto } from 'src/user/dto/user.create.dto';
import Constants from 'src/shared/constants';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    async validateUser(email: string, pass: string): Promise<UserResponseDto> {
        const user = await this.userService.findAuthUserByemail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const result = User.convertToUserResponseDto(user);
            return result;
        }
        return null;
    }

    async login(user: any): Promise<{ access_token: string }> {
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: RegisterDto): Promise<UserResponseDto> {
        const userFound = await this.userService.findAuthUserByemail(registerDto.email);
        if (userFound) {
            throw new BadRequestException(Constants.REGISTER.USER_ALREADY_EXISTS);
        }
        const userToBeCreated = UserCreateDto.mapFromRegisterDto(registerDto);
        const createdUser = await this.userService.create(userToBeCreated);
        return createdUser;
    }
}
