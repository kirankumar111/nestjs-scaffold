import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisCacheModule } from './database/redis/redis-cache.module';
import { MongoModule } from './database/mongo/mongo.module';
import { DatabaseModule } from './database/postgres/postgres.module';
import { RequestMiddleware } from './common/middlewares/logger/request-logger.middleware';
import { ApplicationModule } from './modules/application/application.module';
import { KafkaModule } from './providers/infra/kafka/kafka.module';
import { EventConsumerModule } from './events/consumers/consumer.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: getEnvFilePath(),
    }),
    MongoModule,
    RedisCacheModule,
    DatabaseModule,
    ApplicationModule,
    EventConsumerModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,         // Adds color to console logs
            ignore: 'reqId',
          }
        },
        quietReqLogger: true,  // Disable automatic request logging
        autoLogging: false, // Disable auto logging of requests
      },
    }),
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

function getEnvFilePath() {
  return process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
}
