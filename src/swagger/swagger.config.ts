import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(process.env.APP_NAME || 'NestJs Scaffold')
    .setDescription(process.env.APP_DESCRIPTION || 'This is the NestJs Scaffold Repository')
    .setVersion(process.env.APP_VERSION || '1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};