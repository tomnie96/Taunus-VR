import {Injectable} from '@angular/core';
import {THREE} from 'aframe';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() {
  }

  private isOpen = false;

  open(position: THREE.Vector3): void {
    if (!this.isOpen) {
      this.isOpen = true;
      const map = document.getElementById('nav-map');
      map.dispatchEvent(new CustomEvent('open'));
      map.setAttribute('position', '' + position.x + ' ' + position.y + ' ' + position.z);
      map.setAttribute('visible', 'true');
    }
  }

  close(): void {
    if (this.isOpen) {
      const map = document.getElementById('nav-map');
      map.dispatchEvent(new CustomEvent('close'));
      map.setAttribute('visible', 'false');
      this.isOpen = false;
    }
  }

}
