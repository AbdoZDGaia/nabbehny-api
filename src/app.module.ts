import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check/health-check.controller';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';


@Module({
  imports: [SharedModule, UserModule, AuthModule],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule { }
