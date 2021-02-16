import {Injectable} from '@angular/core';
import {THREE} from 'aframe';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map = this;
  private isRegistered = false;

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
      // map.setAttribute('visible', 'false');
      this.isOpen = false;
    }
  }

  register(): void {
    if (!this.isRegistered) {
      this.isRegistered = true;
      const context = this;

      AFRAME.registerComponent('nav-map', {

        init(): void {
          const self = this.el;
          this.el.children[2].dispatchEvent(new CustomEvent('blink'));

          this.el.addEventListener('change-position', (e) => {
            const position = e.detail.position;

            const x = (position.x + 28) / ((28 - 11) * 2) * .8 - .4;
            const z = (-position.z + 4.3) / ((4.3 + 7) * 2) * .4 - .2;

            self.children[2].setAttribute('position', '' + x + ' ' + z + ' 0.02');
          });
        }
      });

      // Close map
      AFRAME.registerComponent('nav-map-close', {

        init(): void {
          this.el.addEventListener('click', () => {
            context.map.close();
          });
        },
      });
    }
  }

}
