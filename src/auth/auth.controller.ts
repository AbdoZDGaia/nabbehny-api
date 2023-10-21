import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/shared/public.decorator';

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
        status: 201,
        description: 'Login successful',
        schema: {
            example: {
                "access_token": "The generated jwt token...",
            }
        },
    })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
