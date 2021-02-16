import {EventType} from './event-type.enum';

export class AnalyticsEvent {

  sessionId: string;
  eventType: EventType;
  target: string;
  runtime: number;
  isInVR: boolean;

  constructor(
    sessionId: string,
    eventType: EventType,
    target: string,
    runtime: number,
    isInVR: boolean = false,
  ) {
    this.sessionId = sessionId;
    this.eventType = eventType;
    this.target = target;
    this.runtime = runtime;
    this.isInVR = isInVR;
  }

}
