import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import postgresConfig from 'src/configs/postgres.config';
@Module({
  imports: [
    ConfigModule.forFeature(postgresConfig),
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (
          configService: ConfigService,
        ): Promise<TypeOrmModuleOptions> => {
          return configService.get<TypeOrmModuleOptions>('typeormconfig');
        },
      }),
  ],
})
export class DatabaseModule {}
