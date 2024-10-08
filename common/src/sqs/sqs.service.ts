import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

@Injectable()
export class SqsService {
  private readonly sqsClient: SQSClient;
  private readonly queueUrl: string;

  constructor() {
    this.sqsClient = new SQSClient({
      region: process.env.AWS_REGION || 'us-west-2',
    });

    if (!process.env.SQS_QUEUE_URL) {
      throw new Error('SQS_QUEUE_URL environment variable is not set');
    }
    this.queueUrl = process.env.SQS_QUEUE_URL;
  }

  async sendMessage(body: any) {
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(body),
    });

    return this.sqsClient.send(command);
  }
}
