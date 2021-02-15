import {Component, OnInit} from '@angular/core';
import * as AFRAME from 'aframe';
import * as THREE from 'super-three';
import {environment} from '../../../../environments/environment';
import {MenuService} from '../../services/menu.service';
import {NavigationService} from '../../services/navigation.service';
import {CalcService} from '../../services/calc.service';
import {MapService} from '../../services/map.service';
import {Particle3D} from '../../models/particle3-d';

@Component({
  selector: 'app-aframe',
  templateUrl: './aframe.component.html',
  styleUrls: ['./aframe.component.css']
})
export class AframeComponent implements OnInit {

  private camera;
  private cursor;

  constructor(
    private menuService: MenuService,
    private navService: NavigationService,
    private calcService: CalcService,
    private mapService: MapService) {
  }

  ngOnInit(): void {

    this.registerMenu();
    this.registerNavigation();
    this.registerMap();
    this.registerSnow();

  }

  registerMenu(): void {

    const context = this;

    // Open menu button
    AFRAME.registerComponent('menu-open', {

      init(): void {
        // @ts-ignore
        this.camera = document.getElementById('cam-rig').object3D;
        // @ts-ignore
        this.cursor = document.getElementById('cursor').object3D;

        this.el.addEventListener('click', () => {
          this.openMenu(context.calcService.positionInFrontOf(this.camera, this.cursor, 1, -.5));
        });
      },

      tick(): void {
        const pos = this.el.object3D.position;

        // Calculate target position
        const posTarget = context.calcService.positionInFrontOf(this.camera, this.cursor, .5, -.85);

        // Following the cursor smoothly
        pos.lerp(posTarget, environment.menuButtonSmoothing);
      }
    });

// Close menu
    AFRAME.registerComponent('menu-close', {

      init(): void {
        this.el.addEventListener('click', () => {
          context.menuService.closeMenu();
        });
      },
    });

// Button: Map
    AFRAME.registerComponent('menu-open-map', {

      init(): void {
        this.el.addEventListener('click', () => {
          context.menuService.closeMenu();
          context.mapService.openMap(context.calcService.positionInFrontOf(this.camera, this.cursor, 1, -.5));
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
          context.navService.updateMainSphere(this.el, this.data.next);
          document.querySelector('#cam-rig').setAttribute('position', this.currentSphere.object3D.position);
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
            console.log('Location Update: Img ' + this.currentSphere.id + ' - Img ' + self.el.id);

            // Close curtain
            // Curtain becomes automatically invisible after fade animation
            document.getElementById('curtain').setAttribute('visible', 'true');
            document.getElementById('curtain').dispatchEvent(new CustomEvent('fade'));

            // Close menu & map
            context.menuService.closeMenu();
            context.mapService.closeMap();

            // Wait for dark animation
            setTimeout(() => {
              // Set current sphere
              this.currentSphere = self.el;

              this.updateMainSphere(this.currentSphere, self.data.next);

              // Change position
              document.querySelector('#cam-rig').setAttribute('position', this.currentSphere.object3D.position);
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

          if (!context.menuService.isMenuOpen) {
            self.currentSphere.neighbourIds.forEach((neighbourId) => {
              const neighbour = document.getElementById('sky-' + neighbourId);

              if (context.calcService.checkIfVisible(neighbour.children[2].children[0])) {

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
          context.mapService.closeMap();
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

}
