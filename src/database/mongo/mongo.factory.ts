import { Injectable, Logger } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { ServerConfig, ServerConfigName } from 'src/configs/server.config';
import { DatabaseConfig, DatabaseConfigName } from 'src/configs/mongodb.config';

@Injectable()
export class DatabaseFactory implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const dbConfig =  this.configService.getOrThrow<DatabaseConfig>(DatabaseConfigName);

    const { user, host, name, minPoolSize, maxPoolSize } = dbConfig;

    const password = encodeURIComponent(dbConfig.password);
    const uri = `mongodb+srv://${user}:${password}@${host}/${name}`;
    Logger.debug('Database URI:' + uri);
    const serverConfig =
      this.configService.getOrThrow<ServerConfig>(ServerConfigName);
    if (serverConfig.environment == 'development') mongoose.set({ debug: true });

    return {
      uri: uri,
      autoIndex: true,
      minPoolSize: minPoolSize,
      maxPoolSize: maxPoolSize,
      connectTimeoutMS: 60000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity,
    };
  }
}
