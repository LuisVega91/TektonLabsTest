import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [ApplicationModule, ConfigurationModule],
})
export class ServerModule {}
