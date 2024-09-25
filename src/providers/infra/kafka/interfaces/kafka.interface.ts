interface BaseKafkaMessageInterface {
    key: string;
    value: string;
}
export interface BaseKafkaEventInterface {
    topic: string;
    messages: BaseKafkaMessageInterface[];
}