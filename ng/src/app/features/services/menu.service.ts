import {Injectable} from '@angular/core';
// declare var THREE: any;
import {THREE} from 'aframe';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  isOpen = false;

  constructor() {
  }

  open(position: THREE.Vector3): void {
    if (!this.isOpen) {
      this.isOpen = true;
      const menu = document.getElementById('menu');
      menu.setAttribute('visible', 'true');
      menu.setAttribute('position', '' + position.x + ' ' + position.y + ' ' + position.z);
      menu.dispatchEvent(new CustomEvent('open'));

      const menuIcon = document.getElementById('open-menu');
      menuIcon.dispatchEvent(new CustomEvent('close'));
      // menuIcon.setAttribute('visible', 'false');
    }
  }

  close(): void {
    if (this.isOpen) {
      const menu = document.getElementById('menu');
      menu.dispatchEvent(new CustomEvent('close'));
      // menu.setAttribute('visible', 'false'); // Set invisible by animation

      const menuIcon = document.getElementById('open-menu');
      menuIcon.dispatchEvent(new CustomEvent('open'));
      menuIcon.setAttribute('visible', 'true');
      this.isOpen = false;
    }
  }


}
