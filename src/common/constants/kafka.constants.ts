import { ApplicationEventTypes } from "../enums/application-event.enums";
import { KafkaTopicsEnum } from "../enums/kafka.enum";

export const DEV_SCAFFOLD_CONSUMER_GROUP = 'dev-scaffold-consumer-group';

export const applicationEventKafkaTopicMap = {
    [ApplicationEventTypes.Created] : KafkaTopicsEnum.DevScaffoldTopic,
    [ApplicationEventTypes.Updated] : KafkaTopicsEnum.DevScaffoldTopic
}