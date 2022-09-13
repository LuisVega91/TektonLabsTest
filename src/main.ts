import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ServerModule } from './server/server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);

  const config = new DocumentBuilder()
    .setTitle('Tekton Labs Test')
    .setDescription('music suggestion app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
