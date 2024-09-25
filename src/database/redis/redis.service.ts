import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async getValue(
    key: string,
  ): Promise<string | null | undefined | string[] | any> {
    return await this.cache.get(key);
  }

  async setValue(key: string, value: any): Promise<void> {
    await this.cache.set(key, value);
    console.log(await this.cache.get(key));
  }

  async delete(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async getCacheKey(
    module: string,
    resource: string,
    identifier: string,
    ...additionalParts: string[]
  ): Promise<string> {
    return `${module ? module : ''}${resource ? ':' + resource : ''}${identifier ? ':' + identifier : ''}${additionalParts.length ? `:${additionalParts.join(':')}` : ''}`;
  }
}
