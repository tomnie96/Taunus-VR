import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  currentSphere = null; // Current main sphere
  private initialized = false; // Program initialized?
  private isTransitioning = false; // Allow only one transition at the same time

  constructor() {
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
    sphere.children[0].children[0].setAttribute('radius', '100');
    sphere.children[0].children[0].setAttribute('material', 'opacity: 1; color: #FFF');
    sphere.children[0].setAttribute('visible', 'true');
    if (environment.useGroundPlate) {
      sphere.children[1].setAttribute('visible', 'true');
    }
    sphere.children[2].setAttribute('visible', 'false');
    sphere.children[3].setAttribute('visible', 'false');

    sphere.neighbourIds = Array.from(neighbourIds);
  }

// Set sphere as neighbour
  setNeighbour(sphere): void {
    if (sphere != null) {
      document.getElementById(sphere.id).setAttribute('scale', '1 1 1');

      // Sphere
      if (environment.useSpheres) {
        sphere.children[0].setAttribute('visible', 'true');
        sphere.children[0].children[0].setAttribute('radius', environment.sphereSize.toString());
        sphere.children[0].children[0].setAttribute('material', 'opacity: .7; color: #AAA');
      } else {
        sphere.children[0].setAttribute('visible', 'false');
      }
      sphere.children[1].setAttribute('visible', 'false');
      sphere.children[2].setAttribute('visible', 'true');
      if (!environment.useText) {
        sphere.children[2].children[0].children[0].children[0].setAttribute('visible', 'false');
      }
      if (!environment.useText && !environment.useSpheres) {
        sphere.children[2].setAttribute('position', '0 -2 0');
      } // Set link position to floor ring
      if (environment.useFloorRings) {
        sphere.children[3].setAttribute('visible', 'true');
      }
    }
  }

// Meta function: Sets main and neighbour spheres
  updateMainSphere(sphere, neighbourIds): void {
    this.setAllInvisible();
    this.setMainSphere(sphere, neighbourIds);
    neighbourIds.forEach((id) => this.setNeighbour(document.getElementById('sky-' + id)));
  }
}
