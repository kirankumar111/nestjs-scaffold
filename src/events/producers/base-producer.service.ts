import { Inject, Injectable, Logger } from '@nestjs/common';
import { BaseEventInterface } from 'src/common/interfaces/base-event.interface';
import { BaseKafkaEventInterface } from 'src/providers/infra/kafka/interfaces/kafka.interface';
import { ProducerService } from 'src/providers/infra/kafka/producer.service';

@Injectable()
export abstract class BaseProducerService {
  private logger = new Logger(this.constructor.name); 
  constructor(
    @Inject(ProducerService)
    private readonly kafkaProducerService: ProducerService
  ) {}

  abstract publishEvent(event: BaseEventInterface): Promise<boolean>;

  async publishEventToKafka(kafkaEvent: BaseKafkaEventInterface) {
    try {
        await this.kafkaProducerService.produce({
            topic: kafkaEvent.topic,
            messages: kafkaEvent.messages,
          });
      return true
    } catch(e){
      this.logger.error("Exception while publishing event", e.stack);
      return false
    }
  }
}
