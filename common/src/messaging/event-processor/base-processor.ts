import { SqsService } from "../sqs/sqs.service";
import { EventMessage } from "../types/event-message";

export abstract class BaseMessageProcessor {
  constructor(private readonly sqsService: SqsService) {}

  // Poll and process messages (shared logic)
  async processMessages() {
    const messages = await this.sqsService.receiveMessages();
    for (const message of messages) {
      try {
        // Ensure message.Body is not undefined before parsing
        if (message.Body) {
          const parsedMessage: EventMessage = JSON.parse(message.Body);
        
          // Delegate to child class for handling specific event types
          await this.handleMessage(parsedMessage);
        } else {
          console.error('Message body is undefined:', message);
        }
        
        // Delete message after successful processing
        if (message.ReceiptHandle) {
          await this.sqsService.deleteMessage(message.ReceiptHandle);
        } else {
          console.error('ReceiptHandle is undefined for message:', message);
        }
      } catch (error) {
        console.error('Failed to process message:', error);
        // Optionally handle retries or DLQ here
      }
    }
  }

  // Abstract method that child classes must implement
  protected abstract handleMessage(message: EventMessage): Promise<void>;
}
