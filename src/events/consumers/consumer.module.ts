import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/providers/infra/kafka/kafka.module';
import { ApplicationConsumerService } from './applications/application-consumer.service';
import { ApplicationModule } from 'src/modules/application/application.module';
import { ApplicationEventHandler } from './applications/application-event.handler';

@Module({
    imports: [
       KafkaModule,
       ApplicationModule
    ],
  providers: [ApplicationConsumerService,ApplicationEventHandler],
})
export class EventConsumerModule {}