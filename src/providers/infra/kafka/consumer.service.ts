import {
  ConsoleLogger,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Consumer,
  ConsumerConfig,
  ConsumerRunConfig,
  ConsumerSubscribeTopic,
  ConsumerSubscribeTopics,
  Kafka,
  KafkaConfig,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnModuleInit, OnApplicationShutdown {

  private kafka : Kafka;
  private readonly consumers: Consumer[] = [];

  constructor(private configService: ConfigService) {}
    onModuleInit() {
        this.initializeKafka()
    }
  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }

  async initializeKafka() {
    const kafkaConfig =
      this.configService.getOrThrow<KafkaConfig>('kafkaConfig');
    this.kafka = new Kafka(kafkaConfig);
  }

  async addConsumer(
        groupId: string,
        topic: ConsumerSubscribeTopics,
        config: ConsumerRunConfig,
      ) {
        const cosumer: Consumer = this.kafka.consumer({ groupId: groupId });
        await cosumer.connect().catch((e) => console.error(e));
        await cosumer.subscribe(topic);
        await cosumer.run(config);
        this.consumers.push(cosumer);
      }

//   private readonly kafka = new Kafka({
//         brokers: ['pkc-l7pr2.ap-south-1.aws.confluent.cloud:9092'],
//         ssl: true,
//         sasl: {
//           mechanism: 'plain',
//           username: '3KIHKVYRWBOUKT62',
//           password: 'X9OXW46iFLcNjTpGkga8VSIP1ZK6ZUkvf1ykq9bDmNHJVDNT3JID6c9BZF/cW37r',
//         },
//         clientId: 'dev-scaffold-service'
//       });

//   private readonly consumers: Consumer[] = [];

//   async consume(
//     groupId: string,
//     topic: ConsumerSubscribeTopic,
//     config: ConsumerRunConfig,
//   ) {
//     const cosumer: Consumer = this.kafka.consumer({ groupId: groupId });
//     await cosumer.connect().catch((e) => console.error(e));
//     await cosumer.subscribe(topic);
//     await cosumer.run(config);
//     this.consumers.push(cosumer);
//   }
}