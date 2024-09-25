import { registerAs } from '@nestjs/config';
import { logLevel } from 'kafkajs';

// This configuration is used to configure the Kafka client by Confluent Cloud.
export default registerAs('kafkaConfig', () => ({
  // Array of Kafka broker addresses
  brokers: [process.env.KAFKA_BROKER],
  
  // SSL configuration for secure connections
  ssl: process.env.KAFKA_SSL,
  
  // SASL authentication configuration
  sasl: {
    mechanism: process.env.KAFKA_SASL_MECHANISM, // e.g., 'plain', 'scram-sha-256', etc.
    username: process.env.KAFKA_SASL_USERNAME,
    password: process.env.KAFKA_SASL_PASSWORD,
  },
  
  // Unique identifier for this Kafka client
  clientId: process.env.KAFKA_CLIENT_ID,
  
  // Maximum time in milliseconds to wait for a successful connection
  connectionTimeout: parseInt(process.env.KAFKA_CONNECTION_TIMEOUT),
  
  // Maximum time in milliseconds to wait for a request to be acknowledged
  requestTimeout: parseInt(process.env.KAFKA_REQUEST_TIMEOUT),
  
  // Retry configuration for failed requests
  retry: {
    initialRetryTime: process.env.KAFKA_RETRY_INITIAL_RETRY_TIME, // Initial backoff time in milliseconds
    retries: process.env.KAFKA_RETRY_RETRIES, // Maximum number of retries
  },
  
  // Set the logging level for the Kafka client (ERROR level in this case)
  logLevel: logLevel.ERROR,
}));