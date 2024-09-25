import { Injectable, OnModuleInit } from '@nestjs/common';
import { DEV_SCAFFOLD_CONSUMER_GROUP } from 'src/common/constants/kafka.constants';
import { KafkaTopicsEnum } from 'src/common/enums/kafka.enum';
import { ApplicationService } from 'src/modules/application/application.service';
import { ConsumerService } from 'src/providers/infra/kafka/consumer.service';
import { ApplicationEventHandler } from './application-event.handler';

@Injectable()
export class ApplicationConsumerService implements OnModuleInit {
  constructor(private readonly _consumer: ConsumerService
    ,private readonly _applicationService: ApplicationService,
    private readonly _applicationEventHandler: ApplicationEventHandler
  ) {}

  async onModuleInit() {
    this._consumer.addConsumer(
      DEV_SCAFFOLD_CONSUMER_GROUP,
      { topics: [KafkaTopicsEnum.DevScaffoldTopic] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          this._applicationEventHandler.handleEvent({key: message.key.toString(), value: JSON.parse(message.value.toString())});
        },
      },
    );
  }
}