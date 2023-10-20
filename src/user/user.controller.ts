import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.response.dto';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.create.dto';
import { Public } from 'src/shared/public.decorator';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
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
        return user;
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
        return users;
    }

    @Public()
    @Post()
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created.',
        type: UserResponseDto,
    })
    async createUser(@Body() user: UserCreateDto): Promise<UserResponseDto> {
        const createdUser = await this.userService.create(user);
        return createdUser;
    }
}
