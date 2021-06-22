import {Injectable, NgZone} from '@angular/core';
import {THREE} from 'aframe';
import {environment} from '../../../environments/environment';
import {AframeService} from './aframe.service';
import {CalcService} from './calc.service';
import {Router} from '@angular/router';
import {MapService} from './map.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  isOpen = false;

  private isRegistered = false;
  private map;
  private menu = this;

  constructor(
    private aframe: AframeService,
    private calc: CalcService,
    private router: Router,
    private ngZone: NgZone
  ) {
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

  register(map: MapService): void {

    if (!this.isRegistered) {
      this.isRegistered = true;

      const context = this;
      context.map = map;

      AFRAME.registerComponent('button', {
        schema: {
          imageSrc: {type: 'string'},
          text: {type: 'string'}
        },

        init(): void {
          const img = document.createElement('a-image');
          img.setAttribute('src', this.data.imageSrc);
          img.setAttribute('height', .25);
          img.setAttribute('width', .25);
          img.setAttribute('position', '0 .03 .001');

          const text = document.createElement('a-text');
          text.setAttribute('value', this.data.text);
          text.setAttribute('align', 'center');
          text.setAttribute('height', 1);
          text.setAttribute('width', 1.5);
          text.setAttribute('position', '0 -.15 .001');

          this.el.appendChild(img);
          this.el.appendChild(text);
        }
      });

      // Open menu button
      AFRAME.registerComponent('menu-open', {

        init(): void {
          // @ts-ignore
          context.aframe.camera = document.getElementById('cam-rig').object3D;
          // @ts-ignore
          context.aframe.cursor = document.getElementById('cursor').object3D;

          this.el.addEventListener('click', () => {
            context.menu.open(context.calc.positionInFrontOf(context.aframe.camera, context.aframe.cursor, 1, -.5));
            context.map.close();
          });
        },

        tick(): void {
          const pos = this.el.object3D.position;

          // Calculate target position
          const posTarget = context.calc.positionInFrontOf(context.aframe.camera, context.aframe.cursor, 2.2, -2.6);

          // Following the cursor smoothly
          pos.lerp(posTarget, environment.menuButtonSmoothing);
        }
      });

      // Close menu
      AFRAME.registerComponent('menu-close', {

        init(): void {
          this.el.addEventListener('click', () => {
            context.menu.close();
          });
        },
      });

      // Button: Map
      AFRAME.registerComponent('menu-open-map', {

        init(): void {
          this.el.addEventListener('click', () => {
            context.menu.close();
            context.map.open(context.calc.positionInFrontOf(context.aframe.camera, context.aframe.cursor, 1, -.5));
          });
        },
      });

      // Button: Sign up
      AFRAME.registerComponent('menu-sign-up', {

        init(): void {
          this.el.addEventListener('click', () => {
            context.menu.close();

            // NgZone ensures correct DOM update
            context.ngZone.run(() => {
              context.router.navigate(['/danke']);
            });
          });
        },
      });

      // Button: Exit
      AFRAME.registerComponent('menu-exit', {

        init(): void {
          this.el.addEventListener('click', () => {
            context.menu.close();

            // NgZone ensures correct DOM update
            context.ngZone.run(() => {
              context.router.navigate(['/danke']);
            });
          });
        },
      });

      AFRAME.registerComponent('confifrm', {

        init(): void {
          this.el.addEventListener('click', () => {
            context.menu.close();

            // NgZone ensures correct DOM update
            console.log(context);
            console.log(this);
          });
        },
      });
    }
  }

}
