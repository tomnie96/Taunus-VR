import {Device} from './device';

export class Session {
  sessionId: string;
  appVersion: string;
  device: Device;
  datetime: Date;

  constructor(
    sessionId: string,
    appVersion: string,
    device: Device,
    datetime: Date
  ) {
    this.sessionId = sessionId;
    this.appVersion = appVersion;
    this.device = device;
    this.datetime = datetime;
  }
}
