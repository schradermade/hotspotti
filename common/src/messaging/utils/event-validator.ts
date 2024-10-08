// common/src/utils/event-validator.ts
import { EventMessage } from "../types/event-message";

export function validateEventMessage(message: EventMessage): boolean {
  if (!message.eventType || !message.entityType || !message.payload) {
    console.error('Invalid message format:', message);
    return false;
  }
  return true;
}
