import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ApplicationModule,
    ConfigurationModule,
    DatabaseModule,
    LoggerModule,
    AuthModule,
  ],
})
export class ServerModule {}
