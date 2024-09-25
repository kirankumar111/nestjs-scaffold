import { registerAs } from '@nestjs/config';
import { logLevel } from 'kafkajs';


export default registerAs('kafkaConfig', () => ({
  brokers: [process.env.KAFKA_BROKER],
  ssl: process.env.KAFKA_SSL,
  sasl: {
    mechanism: process.env.KAFKA_SASL_MECHANISM,
    username: process.env.KAFKA_SASL_USERNAME,
    password: process.env.KAFKA_SASL_PASSWORD,
  },
  clientId: process.env.KAFKA_CLIENT_ID,
  connectionTimeout: parseInt(process.env.KAFKA_CONNECTION_TIMEOUT),
  requestTimeout: parseInt(process.env.KAFKA_REQUEST_TIMEOUT),
  retry: {
    initialRetryTime: process.env.KAFKA_RETRY_INITIAL_RETRY_TIME,
    retries: process.env.KAFKA_RETRY_RETRIES,
  },
  logLevel: logLevel.ERROR,
}));
