import {
    Injectable,
    OnApplicationShutdown,
    OnModuleInit,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
  import { Kafka, KafkaConfig, Producer, ProducerRecord } from 'kafkajs';
import { FirebaseConfig } from 'src/configs/firebase.config';
  
  @Injectable()
  export class ProducerService implements OnModuleInit, OnApplicationShutdown {
    private producer: Producer;

    constructor(private configService: ConfigService) {
    }
    async onApplicationShutdown() {
      await this.producer.disconnect();
    }
    async onModuleInit() {
      this.initializeProducer();
    }

    async initializeProducer() {
      const kafkaConfig =
        this.configService.getOrThrow<KafkaConfig>('kafkaConfig');
      const kafka = new Kafka(kafkaConfig);
      this.producer = kafka.producer();
      await this.producer.connect();
    }
  
    async produce(record: ProducerRecord) {
      await this.producer.send(record);
    }
  }