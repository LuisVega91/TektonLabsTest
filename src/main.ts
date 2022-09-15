import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { ServerModule } from './server/server.module';
import { API } from './server/routes/routes.constants';

async function bootstrap() {
  const server = await NestFactory.create(ServerModule, { bufferLogs: true });
  server.useLogger(server.get(Logger));
  server.enableCors();
  server.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  server.useGlobalInterceptors(
    new ClassSerializerInterceptor(server.get(Reflector)),
  );
  server.setGlobalPrefix(API);
  const config = new DocumentBuilder()
    .setTitle('Tekton Labs Test')
    .setDescription('music suggestion app')
    .setVersion('1.0')
    .setExternalDoc('OpenAPI.json', '/docs-json')
    .build();
  const document = SwaggerModule.createDocument(server, config);
  SwaggerModule.setup('docs', server, document);

  await server.listen(process.env.PORT || 3000);
}
bootstrap();
