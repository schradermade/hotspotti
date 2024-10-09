import { Injectable } from '@nestjs/common';
import {
  SqsService,
  BaseMessageProcessor,
  EventMessage,
} from '@hotspotti/common';
import { SpottisService } from './spottis.service';

@Injectable()
export class SpottiMessageProcessorService extends BaseMessageProcessor {
  constructor(
    sqsService: SqsService,
    private readonly spottiService: SpottisService,
  ) {
    super(sqsService);
  }

  protected async handleMessage(message: EventMessage) {
    // Log when a message is received
    console.log(
      'Received message for entity:',
      message.entityType,
      'Event type:',
      message.eventType,
    );

    if (message.entityType === 'Spotti') {
      switch (message.eventType) {
        case 'SpottiCreated':
          console.log(
            'Processing SpottiCreated event with payload:',
            message.payload,
          );
          await this.spottiService.createOne(message.payload);
          console.log(
            'Spotti created successfully with payload:',
            message.payload,
          );
          break;
        case 'SpottiUpdated':
          console.log(
            'Processing SpottiUpdated event with payload:',
            message.payload,
          );
          await this.spottiService.updateOne(message.payload);
          console.log(
            'Spotti updated successfully with payload:',
            message.payload,
          );
          break;
        default:
          console.warn('Unhandled Spotti event type:', message.eventType);
      }
    }
  }
}
