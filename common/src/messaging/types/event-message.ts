export interface EventMessage {
  eventType: string;      // e.g., 'UserCreated', 'SpottiUpdated'
  entityType: string;     // e.g., 'User', 'Spotti'
  payload: any;           // The actual data relevant to the event
  metadata: {
    triggeredBy: number;  // ID of the user who triggered the event
    timestamp: string;    // Timestamp of the event
  };
}
