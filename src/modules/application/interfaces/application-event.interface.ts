import { BaseEventInterface } from "src/common/interfaces/base-event.interface";

interface ApplicationEventMessageInterface {
    name: string;
    description: string;
}
export interface ApplicationEventInterface extends BaseEventInterface{
    key: string;
    value: ApplicationEventMessageInterface;
}