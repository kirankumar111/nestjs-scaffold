import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationEventProducerService } from './applications/application-producer.service';
import { KafkaModule } from 'src/providers/infra/kafka/kafka.module';

@Module({
    imports: [
       KafkaModule
    ],
  providers: [ApplicationEventProducerService],
  exports: [ApplicationEventProducerService],
})
export class EventProducerModule {}