import { registerAs } from '@nestjs/config';

export const ServerConfigName = 'server';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

export interface ServerConfig {
  environment: string;
  port: number;
  timezone: string;
  host: string;
}

export default registerAs(ServerConfigName, () => ({
  environment: process.env.ENV || 'development',
  port: parseInt(process.env.APP_PORT || '3000'),
  timezone: process.env.TZ,
  host: process.env.APP_ADDRESS,
}));
