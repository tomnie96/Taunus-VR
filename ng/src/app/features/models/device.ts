export class Device {
  userAgent: string;
  connectionSpeed: number;
  connectionType: string;
  resWidth: number;
  resHeight: number;

  constructor(
    userAgent: string,
    connectionSpeed: number,
    connectionType: string,
    resWidth: number,
    resHeight: number
  ) {
    this.userAgent = userAgent;
    this.connectionSpeed = connectionSpeed;
    this.connectionType = connectionType;
    this.resWidth = resWidth;
    this.resHeight = resHeight;
  }
}
