import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenvConfig({ path: '.env' });
const postgresConfig = {
  type: 'postgres' as const,
  host: `${process.env.POSTGRES_HOST}`,
  port: +process.env.POSTGRES_PORT,
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DBNAME}`,
  schema: `${process.env.POSTGRES_SCHEMA}`,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs(
  'typeormconfig',
  (): TypeOrmModuleOptions => postgresConfig,
);
export const AppDataSource = new DataSource(
  postgresConfig as DataSourceOptions,
);
