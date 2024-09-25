import { Injectable } from '@nestjs/common';
import { CacheOptionsFactory, CacheModuleOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';
import { CacheConfig, CacheConfigName } from 'src/configs/redis.config';

@Injectable()
export class CacheConfigFactory implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createCacheOptions(): Promise<CacheModuleOptions> {
    const cacheConfig =
      this.configService.getOrThrow<CacheConfig>(CacheConfigName);
    const redisURL = `redis://${cacheConfig.host}:${cacheConfig.port}`;
    return {
      store: redisStore,
      url: redisURL,
      ttl: cacheConfig.ttl,
    };
  }
}
