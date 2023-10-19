import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/public.decorator';

@Public()
@Controller('health-check')
@ApiTags('Health Check')
export class HealthCheckController {

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Healthy response',
        schema: {
            example: 'Healthy!',
        },
    })
    @ApiResponse({
        status: 500,
        description: 'Unhealthy response',
        schema: {
            example: {
                "message": "Internal server error",
                "statusCode": 500,
            }
        },
    })
    check() {
        return 'Healthy!';
    }
}
