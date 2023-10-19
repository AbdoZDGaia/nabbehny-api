import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { UserResponseDto } from 'src/user/dto/user.response.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    async validateUser(email: string, pass: string): Promise<UserResponseDto> {
        const user = await this.userService.findAuthUserByemail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, createdAt, ...result } = user.toJSON();
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
