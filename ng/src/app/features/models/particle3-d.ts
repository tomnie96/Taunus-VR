import * as THREE from 'super-three';
import {CustomVector3} from './custom-vector3';

export class Particle3D extends THREE.Sprite {

  velocity: CustomVector3;
  gravity: CustomVector3;
  drag: number;

  constructor(material: any) {
    super(material);

    // this.material = material instanceof Array ? material : [ material ];
    // define properties
    this.velocity = new CustomVector3(0, -.17, 0);
    this.velocity.rotateX(this.randomRange(-45, 45));
    this.velocity.rotateY(this.randomRange(0, 360));
    this.gravity = new CustomVector3(0, 0, 0);
    this.drag = 1;
    // methods...
  }

  updatePhysics(): void {
    this.velocity.multiplyScalar(this.drag);
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);
  }

  randomRange(min, max): number {
    return ((Math.random() * (max - min)) + min);
  }
}
