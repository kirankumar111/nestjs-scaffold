import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';
import { ConfigModule } from '@nestjs/config';
import kafkaConfig from 'src/configs/kafka.config';

@Module({
    imports: [
        ConfigModule.forFeature(kafkaConfig),
    ],
  providers: [ConsumerService, ProducerService],
  exports: [ConsumerService, ProducerService],
})
export class KafkaModule {}