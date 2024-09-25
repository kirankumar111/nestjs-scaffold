import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { fastifyCookie } from '@fastify/cookie';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NewrelicInterceptor } from './common/interceptors/newrelic.interceptor';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, ServerConfigName } from './configs/server.config';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import compress from '@fastify/compress';  // Use the correct package
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { setupSwagger } from './swagger/swagger.config';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({caseSensitive: false, ignoreTrailingSlash: true}),
    { bufferLogs: true
    }
  );
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();
  app.register(compress);
  const isProduction = process.env.envirenment === 'production';
  await app.getHttpAdapter().getInstance().register(fastifyCookie,{
    parseOptions: {
      secure: isProduction,
    }});
  app.enableCors();
  if(!isProduction) {
    setupSwagger(app);
  }
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());  
  
  const configService = app.get(ConfigService);
  const serverConfig = configService.getOrThrow<ServerConfig>(ServerConfigName);

  app.useGlobalInterceptors(
    new LoggerErrorInterceptor(),
    new NewrelicInterceptor(),
    new ResponseInterceptor(),
  );

  try {
    await app.listen(serverConfig.port,serverConfig.host||'0.0.0.0');
    logger.log(
      `${process.env.APP_NAME || 'NestJs Scaffold'} Microservice Application is running on: ${await app.getUrl()}/api`,
    );  } catch (error) {
    logger.error(`Error starting the application: ${error}`);
  }  
  

}
bootstrap();
