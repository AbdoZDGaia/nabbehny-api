import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.response.dto';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './shemas/user.shema';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'The found user response',
        type: UserResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: 'User not found response',
        schema: {
            example: {
                "message": "User not found",
                "error": "Not Found",
                "statusCode": 404
            }
        },
    })
    async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
        var user = await this.userService.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const result: UserResponseDto = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles
        };
        return result;
    }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Existing users response',
        type: Array<UserResponseDto>,
    })
    @ApiResponse({
        status: 404,
        description: 'No users response',
        schema: {
            example: {
                "message": "No users were found",
                "error": "Not Found",
                "statusCode": 404
            }
        },
    })
    async getUsers(): Promise<UserResponseDto[]> {
        var users = await this.userService.findAll();
        if (!users || users.length == 0) {
            throw new NotFoundException('No users were found');
        }
        const result: UserResponseDto[] = [];
        users.forEach(user => {
            result.push({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roles: user.roles
            });
        });
        return result;
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created.',
        type: UserResponseDto,
    })
    async createUser(@Body() user: UserCreateDto): Promise<UserResponseDto> {
        const createdUser = await this.userService.create(user);
        const result: UserResponseDto = {
            id: createdUser._id,
            firstName: createdUser.firstName,
            lastName: createdUser.lastName,
            email: createdUser.email,
            roles: createdUser.roles
        };
        return result;
    }
}
