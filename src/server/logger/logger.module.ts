import { Module, MiddlewareConsumer, NestModule, Global } from '@nestjs/common';
import { LoggerModule as LoggerPinoModule } from 'nestjs-pino';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';

import {
  CorrelationIdMiddleware,
  CORRELATION_ID_HEADER,
} from './correlation-id.middleware';
import { Environment } from './../configuration/constants/environment.constant';
import { LoggerService } from './logger.service';
import config from '../configuration/config';

@Global()
@Module({
  imports: [
    LoggerPinoModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { environment, loggerLevel } = configService.server;
        return {
          pinoHttp: {
            messageKey: 'message',
            level: loggerLevel,
            useLevelLabels: true,
            autoLogging: true,
            serializers: {
              req: () => undefined,
              res: () => undefined,
            },
            transport:
              environment !== Environment.Production
                ? { target: 'pino-pretty' }
                : undefined,
            customProps: (req: Request) => {
              return {
                correlationId: req[CORRELATION_ID_HEADER],
              };
            },
          },
        };
      },
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
