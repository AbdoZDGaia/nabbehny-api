import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
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
        if (id !== '1') {
            const user = new UserResponseDto();
            user.id = 1;
            user.firstName = 'Test User';
            user.lastName = 'The First';
            user.email = 'test@test.com';
            user.createdAt = new Date();
            user.updatedAt = new Date();
            return user;
        } else {
            throw new NotFoundException('User not found');
        }
    }
}
