import { Controller, Post, UseGuards, Request, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/shared/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from 'src/user/dto/user.response.dto';
import Constants from 'src/shared/constants';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }


    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiResponse({
        status: 401,
        description: 'Invalid Credentials',
        schema: {
            example: {
                "message": "Invalid credentials",
                "error": "Unauthorized",
                "statusCode": 401
            }
        },
    })
    @ApiResponse({
        status: 500,
        description: 'Internal Server Error',
        schema: {
            example: {
                "message": "Internal server error",
                "error": "Internal Server Error",
                "statusCode": 500
            }
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Login successful',
        schema: {
            example: {
                "access_token": "The generated jwt token...",
            }
        },
    })
    async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
        return this.authService.login(loginDto);
    }


    @ApiResponse({
        status: 500,
        description: 'Internal Server Error',
        schema: {
            example: {
                "message": "Internal server error",
                "error": "Internal Server Error",
                "statusCode": 500
            }
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Registration successful',
        schema: {
            example: {
                "_id": "5f2d3e5d-8e2a-4b2a-8b7f-6f5e7c3f5e7c",
                "firstName": "John",
                "lastName": "Doe",
                "email": "john@doe.com",
                "roles": [
                    "user"
                ],
            }
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        schema: {
            example: {
                "message": Constants.REGISTER.USER_ALREADY_EXISTS,
                "error": "Bad Request",
                "statusCode": 400
            }
        },
    })
    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<UserResponseDto> {
        const registeredUser = this.authService.register(registerDto);
        return registeredUser;
    }
}
