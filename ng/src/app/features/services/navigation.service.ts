import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {CalcService} from './calc.service';
import {MapService} from './map.service';
import {MenuService} from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  currentSphere = null; // Current main sphere
  private map;
  private nav = this;
  private menu;
  private isRegistered = false;

  private initialized = false; // Program initialized?
  private isTransitioning = false; // Allow only one transition at the same time

  constructor(
    private calc: CalcService
  ) {
  }

// Set all spheres invisible
  setAllInvisible(): void {
    document.querySelectorAll('[id^="sky-"]').forEach((sphere => sphere.setAttribute('scale', '.001 .001 .001')));
  }

// Set sphere as main
  setMainSphere(sphere, neighbourIds): void {
    console.log(sphere);

    this.currentSphere = sphere;
    document.getElementById(sphere.id).setAttribute('scale', '1 1 1');

    // child 0: Sphere
    // child 1: Ground plate
    // child 2: Label
    // child 3: Floor Ring
    sphere.children[0].setAttribute('radius', '100');
    sphere.children[0].setAttribute('material', 'opacity: 1; color: #FFF');
    sphere.children[0].setAttribute('visible', 'true');
    // sphere.children[2].setAttribute('visible', 'false');
    // sphere.children[3].setAttribute('visible', 'false');

    sphere.neighbourIds = Array.from(neighbourIds);
  }

// Set sphere as neighbour
  setNeighbour(sphere): void {
    if (sphere != null) {
      document.getElementById(sphere.id).setAttribute('scale', '1 1 1');

      // Sphere
      if (environment.useSpheres) {
        sphere.children[0].setAttribute('visible', 'true');
        sphere.children[0].setAttribute('radius', environment.sphereSize.toString());
        sphere.children[0].setAttribute('material', 'opacity: .7; color: #AAA');
      } else {
        sphere.children[0].setAttribute('visible', 'false');
      }
      // sphere.children[2].setAttribute('visible', 'true');
      // if (!environment.useText) {
      //   sphere.children[2].children[0].children[0].children[0].setAttribute('visible', 'false');
      // }
      // if (!environment.useText && !environment.useSpheres) {
      //   sphere.children[2].setAttribute('position', '0 -2 0');
      // } // Set link position to floor ring
      // if (environment.useFloorRings) {
      //   sphere.children[3].setAttribute('visible', 'true');
      // }
    }
  }

// Meta function: Sets main and neighbour spheres
  updateMainSphere(sphere, neighbourIds): void {
    this.setAllInvisible();
    this.setMainSphere(sphere, neighbourIds);
    neighbourIds.forEach((id) => this.setNeighbour(document.getElementById('sky-' + id)));
  }

  register(map: MapService, menu: MenuService): void {
    if (!this.isRegistered) {
      this.isRegistered = true;

      const context = this;
      context.map = map;
      context.menu = menu;

      // Attribute: Initial sphere
      AFRAME.registerComponent('initial-sphere', {

        schema: {
          next: {type: 'array'}
        },

        init(): void {
          if (!this.initialized) {
            context.initialized = true;

            // Set position
            context.nav.updateMainSphere(this.el, this.data.next);
            document.querySelector('#cam-rig').setAttribute('position', context.nav.currentSphere.object3D.position);
          }
        }
      });

// Attribute: Link Navigation
      AFRAME.registerComponent('nav', {

        schema: {
          next: {type: 'array'}
        },

        init(): void {
          const self = this;

          this.el.addEventListener('click', () => {
            // Block
            if (!context.isTransitioning) {
              context.isTransitioning = true;

              // Log target
              console.log('Location Update: Img ' + context.nav.currentSphere.id + ' - Img ' + self.el.id);

              // Close curtain
              // Curtain becomes automatically invisible after fade animation
              document.getElementById('curtain').setAttribute('visible', 'true');
              document.getElementById('curtain').dispatchEvent(new CustomEvent('fade'));

              // Close menu & map
              context.menu.close();
              context.map.close();

              // Wait for dark animation
              setTimeout(() => {
                // Set current sphere
                context.nav.currentSphere = self.el;

                context.updateMainSphere(context.nav.currentSphere, self.data.next);

                // Change position
                document.querySelector('#cam-rig').setAttribute('position', context.nav.currentSphere.object3D.position);
                document.getElementById('nav-map').dispatchEvent(new CustomEvent('change-position', {
                  detail: {
                    position: self.el.getAttribute('position')
                  }
                }));

                // Reset blocker
                context.isTransitioning = false;

              }, 160);
            }
          });
        },
      });

      // Attribute: Click anywhere Navigation
      AFRAME.registerComponent('click-nav', {

        init(): void {
          const self = this;
          this.el.addEventListener('nav-click', () => {
            let minDistance = 10000;
            let minObject = null;
            let distance = 10000;

            if (!context.menu.isOpen) {
              self.currentSphere.neighbourIds.forEach((neighbourId) => {
                const neighbour = document.getElementById('sky-' + neighbourId);

                if (context.calc.checkIfVisible(neighbour.children[2].children[0])) {

                  // @ts-ignore
                  distance = document.getElementById('cam-rig').object3D.position.distanceTo(neighbour.object3D.position);
                  if (distance < minDistance) {
                    minDistance = distance;
                    minObject = neighbour;
                  }
                }
              });

              if (minObject != null) {
                // Notify close object
                minObject.dispatchEvent(new CustomEvent('click'));
              }
            }
          });
        },
      });
    }
  }
}
