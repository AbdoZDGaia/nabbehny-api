import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RegisterDto } from 'src/auth/dto/register.dto';

export class UserCreateDto {

    static mapFromRegisterDto(registerDto: RegisterDto): UserCreateDto {
        const userCreateDto = new UserCreateDto();
        userCreateDto.firstName = registerDto.firstName;
        userCreateDto.lastName = registerDto.lastName;
        userCreateDto.email = registerDto.email;
        userCreateDto.password = registerDto.password;
        userCreateDto.roles = registerDto.roles;
        return userCreateDto;
    }

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsArray()
    roles: string[];
}
