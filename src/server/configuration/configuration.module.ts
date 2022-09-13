import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvironmentFile } from './constants/environment.constant';
import { environmentVariablesSchema } from './schemas';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        EnvironmentFile[process.env.NODE_ENV] || EnvironmentFile.development,
      load: [config],
      validationSchema: environmentVariablesSchema,
    }),
  ],
})
export class ConfigurationModule {}
