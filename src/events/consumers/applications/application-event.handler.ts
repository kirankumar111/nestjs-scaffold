import { Injectable, Logger } from '@nestjs/common';
import { ApplicationEventTypes } from 'src/common/enums/application-event.enums';
import { ApplicationService } from 'src/modules/application/application.service';
import { ApplicationEventInterface } from 'src/modules/application/interfaces/application-event.interface';

@Injectable()
export class ApplicationEventHandler {
  constructor(private readonly _applicationService: ApplicationService
  ) {}
  private logger = new Logger(ApplicationEventHandler.name);
private readonly eventHandlers = {
    [ApplicationEventTypes.Created] : this._applicationService.processEvent,
    [ApplicationEventTypes.Created] : this._applicationService.processEvent,
};

// Function to handle events
async handleEvent(event: ApplicationEventInterface) {
    const handler = this.eventHandlers[event.key];
    if (handler) {
        handler(event);
    } else {
        this.logger.error(`No handler found for event: ${event.key}`)
    }
}
}