import {Component, NgZone, OnInit} from '@angular/core';
import {THREE} from 'aframe';

import {environment} from '../../../../environments/environment';
import {MenuService} from '../../services/menu.service';
import {NavigationService} from '../../services/navigation.service';
import {CalcService} from '../../services/calc.service';
import {MapService} from '../../services/map.service';
import {Particle3D} from '../../models/particle3-d';
import {Router} from '@angular/router';

@Component({
  selector: 'app-aframe',
  templateUrl: './aframe.component.html',
  styleUrls: ['./aframe.component.css']
})
export class AframeComponent implements OnInit {

  private camera;
  private cursor;

  constructor(
    private router: Router,
    private nav: NavigationService,
    private menu: MenuService,
    private calc: CalcService,
    private map: MapService,
    private ngZone: NgZone) {
  }

  ngOnInit(): void {

    this.registerPositions();
    this.registerMenu();
    this.registerNavigation();
    this.registerMap();
    this.registerSnow();
    this.registerLookAt();

  }

  registerPositions(): void {
  }

  registerMenu(): void {

    const context = this;

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
        context.camera = document.getElementById('cam-rig').object3D;
        // @ts-ignore
        context.cursor = document.getElementById('cursor').object3D;

        this.el.addEventListener('click', () => {
          context.menu.open(context.calc.positionInFrontOf(context.camera, context.cursor, 1, -.5));
          context.map.close();
        });
      },

      tick(): void {
        const pos = this.el.object3D.position;

        // Calculate target position
        const posTarget = context.calc.positionInFrontOf(context.camera, context.cursor, 2.2, -2.6);

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
          context.map.open(context.calc.positionInFrontOf(context.camera, context.cursor, 1, -.5));
        });
      },
    });

    // Button: Sign up
    AFRAME.registerComponent('menu-sign-up', {

      init(): void {
        this.el.addEventListener('click', () => {
          context.menu.close();
          context.router.navigate(['/danke']);
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
  }

  registerNavigation(): void {

    const context = this;

    // Attribute: Initial sphere
    AFRAME.registerComponent('initial-sphere', {

      schema: {
        next: {type: 'array'}
      },

      init(): void {
        if (!this.initialized) {
          this.initialized = true;

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
          if (!this.isTransitioning) {
            this.isTransitioning = true;

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

              this.updateMainSphere(context.nav.currentSphere, self.data.next);

              // Change position
              document.querySelector('#cam-rig').setAttribute('position', context.nav.currentSphere.object3D.position);
              document.getElementById('nav-map').dispatchEvent(new CustomEvent('change-position', {
                detail: {
                  position: self.el.getAttribute('position')
                }
              }));

              // Reset blocker
              this.isTransitioning = false;

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

  registerMap(): void {

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

  registerSnow(): void {
    AFRAME.registerComponent('snow', {

      init(): void {
        const self = this;
        let particle;
        this.particles = [];
        if (environment.introScreen) {
          const scene = this.el.sceneEl.object3D;

          // Disable curtain
          document.getElementById('curtain').setAttribute('visible', 'false');

          const particleImage = new Image(); // THREE.ImageUtils.loadTexture( "http://i.imgur.com/cTALZ.png" );
          particleImage.src = 'assets/snow.png';

          const material = new THREE.PointsMaterial({map: new THREE.Texture(particleImage)});

          for (let i = 0; i < 500; i++) {

            particle = new Particle3D(material);
            particle.position.x = Math.random() * 200 - 100;
            particle.position.y = Math.random() * 200 - 100;
            particle.position.z = Math.random() * 200 - 195;
            particle.scale.x = particle.scale.y = .25;
            scene.add(particle);

            this.particles.push(particle);
          }
        }

        // Todo: True onload
        const waitingTime = environment.introScreen ? 15000 : 1;
        // @ts-ignore
        document.querySelector('a-assets').fileLoader.manager.onLoad = (() => {
          console.log('Load!');

          setTimeout(() => {
            document.getElementById('w-sphere').removeAttribute('snow');

            // Curtain
            document.getElementById('curtain').setAttribute('visible', 'true');
            // @ts-ignore
            document.getElementById('curtain').emit('fadelong');

            setTimeout(() => {
              document.getElementById('sky-55').setAttribute('initial-sphere', 'next: 52, 57');

              document.getElementById('welcome').setAttribute('visible', 'false');

              // @ts-ignore
              document.getElementById('curtain').emit('fadelongback');

              document.getElementById('nav-map').dispatchEvent(new CustomEvent('change-position', {
                detail: {
                  position: self.el.getAttribute('position')
                }
              }));
            }, 600);


          }, waitingTime);


        });
      },

      tick(): void {
        if (environment.introScreen) {
          this.particles.forEach((particle) => {
            particle.updatePhysics();

            const pp = particle.position;

            if (pp.y < -10) {
              pp.y += 110;
            }
            if (pp.x > 100) {
              pp.x -= 200;
            } else if (pp.x < -100) {
              pp.x += 200;
            }
            if (pp.z > 5) {
              pp.z -= 100;
            } else if (pp.z < -100) {
              pp.z += 105;
            }
          });
        }
      },

      remove(): void {
        this.particles.forEach((particle) => {
          particle.geometry.dispose();
          particle.material.dispose();
          this.el.sceneEl.object3D.remove(particle);
        });
      }
    });
  }

  registerLookAt(): void {
    const coordinates = AFRAME.utils.coordinates;
    // @ts-ignore
    const isCoordinates = coordinates.isCoordinates;

    /**
     * Look-at component. Adapted from: https://www.npmjs.com/package/aframe-look-at-component/v/0.8.0
     *
     * Modifies rotation to either track another entity OR do a one-time turn towards a position
     * vector.
     *
     * If tracking an object via setting the component value via a selector, look-at will register
     * a behavior to the scene to update rotation on every tick.
     */
    AFRAME.registerComponent('look-at', {
      schema: {
        default: '0 0 0',

        parse(value): any {
          // A static position to look at.
          if (isCoordinates(value) || typeof value === 'object') {
            return coordinates.parse(value);
          }
          // A selector to a target entity.
          return value;
        },

        stringify(data): string {
          if (typeof data === 'object') {
            return coordinates.stringify(data);
          }
          return data;
        }
      },

      init(): void {
        this.target3D = null;
        this.vector = new THREE.Vector3();
        // @ts-ignore
        this.cameraListener = AFRAME.utils.bind(this.cameraListener, this);
        this.el.addEventListener('componentinitialized', this.cameraListener);
        this.el.addEventListener('componentremoved', this.cameraListener);
      },

      /**
       * If tracking an object, this will be called on every tick.
       * If looking at a position vector, this will only be called once (until further updates).
       */
      update(): any {
        const self = this;
        const target = self.data;
        let targetEl;

        // No longer looking at anything (i.e., look-at="").
        if (!target || (typeof target === 'object' && !Object.keys(target).length)) {
          return self.remove();
        }

        // Look at a position.
        if (typeof target === 'object') {
          return this.lookAt(new THREE.Vector3(target.x, target.y, target.z));
        }

        // Assume target is a string.
        // Query for the element, grab its object3D, then register a behavior on the scene to
        // track the target on every tick.
        targetEl = self.el.sceneEl.querySelector(target);
        if (!targetEl) {
          console.warn('"' + target + '" does not point to a valid entity to look-at');
          return;
        }
        if (!targetEl.hasLoaded) {
          return targetEl.addEventListener('loaded', () => {
            self.beginTracking(targetEl);
          });
        }
        return self.beginTracking(targetEl);
      },

      tick(): void {
        const self = this;
        const vec3 = new THREE.Vector3();
        const target3D = self.target3D;
        if (target3D) {
          target3D.getWorldPosition(vec3);
          self.lookAt(vec3);
        }
      },

      remove(): void {
        this.el.removeEventListener('componentinitialized', this.cameraListener);
        this.el.removeEventListener('componentremoved', this.cameraListener);
      },

      beginTracking(targetEl): void {
        this.target3D = targetEl.object3D;
      },

      cameraListener(e): void {
        if (e.detail && e.detail.name === 'camera') {
          this.update();
        }
      },

      lookAt(position): void {
        const vector = this.vector;
        const object3D = this.el.object3D;

        if (this.el.getObject3D('camera')) {
          // Flip the vector to -z, looking away from target for camera entities. When using
          // lookat from THREE camera objects, this is applied for you, but since the camera is
          // nested into a Object3D, we need to apply this manually.
          vector.subVectors(object3D.position, position).add(object3D.position);
        } else {
          vector.copy(position);
        }

        object3D.lookAt(vector);
      }
    });
  }

}
