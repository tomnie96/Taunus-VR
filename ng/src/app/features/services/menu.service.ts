import {Injectable} from '@angular/core';
import * as THREE from 'super-three';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  isMenuOpen = false;

  constructor() {

  }

  openMenu(position: THREE.Vector3): void {
    if (!this.isMenuOpen) {
      this.isMenuOpen = true;

      const menu = document.getElementById('menu');
      menu.setAttribute('visible', 'true');
      menu.setAttribute('position', '' + position.x + ' ' + position.y + ' ' + position.z);
      menu.dispatchEvent(new CustomEvent('open'));

      const menuIcon = document.getElementById('open-menu');
      menuIcon.dispatchEvent(new CustomEvent('close'));
      // menuIcon.setAttribute('visible', 'false');
    }
  }

  closeMenu(): void {
    if (this.isMenuOpen) {
      const menu = document.getElementById('menu');
      menu.dispatchEvent(new CustomEvent('close'));
      // menu.setAttribute('visible', 'false'); // Set invisible by animation

      const menuIcon = document.getElementById('open-menu');
      menuIcon.dispatchEvent(new CustomEvent('open'));
      menuIcon.setAttribute('visible', 'true');
      this.isMenuOpen = false;
    }
  }


}
