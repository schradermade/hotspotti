import { Injectable } from '@nestjs/common';
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand, Message } from '@aws-sdk/client-sqs';

@Injectable()
export class SqsService {
  private readonly sqsClient: SQSClient;
  private readonly queueUrl: string;
  
  constructor() {
    this.sqsClient = new SQSClient({ region: process.env.AWS_REGION });
    
    if (!process.env.SQS_QUEUE_URL) {
      throw new Error('SQS_QUEUE_URL environment variable is not set');
    }
    this.queueUrl = process.env.SQS_QUEUE_URL;  // SQS queue URL
  }

  // Poll for messages from SQS
  async receiveMessages(): Promise<Message[]> {
    const command = new ReceiveMessageCommand({
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 10,  // Long-polling for efficiency
    });

    const response = await this.sqsClient.send(command);
    return response.Messages || [];
  }

  // Delete message after processing
  async deleteMessage(receiptHandle: string) {
    const command = new DeleteMessageCommand({
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    });

    await this.sqsClient.send(command);
  }
}

