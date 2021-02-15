import {Injectable} from '@angular/core';
import * as THREE from 'super-three';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() {
  }

  private isMapOpen = false;

  openMap(position: THREE.Vector3): void {
    if (!this.isMapOpen) {
      this.isMapOpen = true;
      const map = document.getElementById('nav-map');
      map.dispatchEvent(new CustomEvent('open'));
      map.setAttribute('position', '' + position.x + ' ' + position.y + ' ' + position.z);
      map.setAttribute('visible', 'true');
    }
  }

  closeMap(): void {
    if (this.isMapOpen) {
      const map = document.getElementById('nav-map');
      map.dispatchEvent(new CustomEvent('close'));
      map.setAttribute('visible', 'false');
      this.isMapOpen = false;
    }
  }

}
