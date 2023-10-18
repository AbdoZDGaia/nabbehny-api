import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check/health-check.controller';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [SharedModule, UserModule],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
