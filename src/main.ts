import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './application/application.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

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
