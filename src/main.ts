import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { fastifyCookie } from '@fastify/cookie';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NewrelicInterceptor } from './common/interceptors/newrelic.interceptor';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, ServerConfigName } from './configs/server.config';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import compress from '@fastify/compress';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { setupSwagger } from './swagger/swagger.config';

async function bootstrap() {
  // Create a NestJS application with Fastify as the underlying HTTP server
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ caseSensitive: false, ignoreTrailingSlash: true }),
    { bufferLogs: true }
  );

  // Set up logging
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.flushLogs();

  // Enable compression for responses
  app.register(compress);

  // Determine if the application is running in production
  const isProduction = process.env.environment === 'production';

  // Set up cookie parsing
  await app.getHttpAdapter().getInstance().register(fastifyCookie, {
    parseOptions: { secure: isProduction }
  });

  // Enable CORS
  app.enableCors();

  // Set up Swagger API documentation for non-production environments
  if (!isProduction) {
    setupSwagger(app);
  }

  // Set up global pipes, filters, and interceptors
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new LoggerErrorInterceptor(),
    new NewrelicInterceptor(),
    new ResponseInterceptor(),
  );

  // Get server configuration
  const configService = app.get(ConfigService);
  const serverConfig = configService.getOrThrow<ServerConfig>(ServerConfigName);

  try {
    await app.listen(serverConfig.port, serverConfig.host || '0.0.0.0');
    logger.log(
      `${process.env.APP_NAME || 'NestJs Scaffold'} Microservice Application is running on: ${await app.getUrl()}/api`,
    );
  } catch (error) {
    logger.error(`Error starting the application: ${error}`);
  }
}

// Run the bootstrap function to start the application
bootstrap();