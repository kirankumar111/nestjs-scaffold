import { registerAs } from '@nestjs/config';

export const DatabaseConfigName = 'mongodb';

export interface DatabaseConfig {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
  minPoolSize: number;
  maxPoolSize: number;
}

export default registerAs(DatabaseConfigName, () => ({
  name: process.env.MONGO_DB_NAME || '',
  host: process.env.MONGO_DB_HOST || '',
  port: process.env.MONGO_DB_PORT || '',
  user: process.env.MONGO_DB_USER || '',
  password: process.env.MONGO_DB_USER_PWD || '',
  minPoolSize: parseInt(process.env.MONGO_DB_MIN_POOL_SIZE || '5'),
  maxPoolSize: parseInt(process.env.MONGO_DB_MAX_POOL_SIZE || '10'),
}));
