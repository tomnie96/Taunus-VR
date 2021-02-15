// declare var THREE: any;
import {THREE} from 'aframe';

export class CustomVector3 extends THREE.Vector3 {

  TO_RADIANS = Math.PI / 180;

  rotateY(angle: number): void {
    const cosRY = Math.cos(angle * this.TO_RADIANS);
    const sinRY = Math.sin(angle * this.TO_RADIANS);

    const tempz = this.z;
    const tempx = this.x;

    this.x = (tempx * cosRY) + (tempz * sinRY);
    this.z = (tempx * -sinRY) + (tempz * cosRY);
  }

  rotateX(angle: number): void {
    const cosRY = Math.cos(angle * this.TO_RADIANS);
    const sinRY = Math.sin(angle * this.TO_RADIANS);

    const tempz = this.z;
    const tempy = this.y;

    this.y = (tempy * cosRY) + (tempz * sinRY);
    this.z = (tempy * -sinRY) + (tempz * cosRY);
  }

  rotateZ(angle: number): void {
    const cosRY = Math.cos(angle * this.TO_RADIANS);
    const sinRY = Math.sin(angle * this.TO_RADIANS);

    const tempx = this.x;
    const tempy = this.y;

    this.y = (tempy * cosRY) + (tempx * sinRY);
    this.x = (tempy * -sinRY) + (tempx * cosRY);
  }

}
