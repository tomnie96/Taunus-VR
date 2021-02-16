import {Injectable} from '@angular/core';
// import * as THREE from 'super-three';
// declare var THREE: any;
import {THREE} from 'aframe';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  private isRegistered = false;

  constructor() {
  }

  // Check visibility
  // From: https://gist.github.com/Strae/7def0f84677e03727f771636709b448f
  checkIfVisible(entity): boolean {

    const entityMesh = entity.object3DMap.mesh;
    const frustum = new THREE.Frustum();
    const cameraViewProjectionMatrix = new THREE.Matrix4();
    let camera: THREE.PerspectiveCamera;

    // Get camera
    // @ts-ignore
    camera = document.querySelector('[camera]').getObject3D('camera');

    // Update camera attributes
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();

    // Set limited FoV
    // @ts-ignore
    camera = camera.clone();
    camera.aspect = .5; // Reduced from 1
    camera.fov = 60; // Reduced from 80
    // camera.zoom = 4; // Alt variant to reduce fov

    camera.updateProjectionMatrix();

    // camera.matrixWorldInverse.getInverse(camera.matrixWorld);
    cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

    return frustum.intersectsObject(entityMesh);
  }

  /***
   * Get Vector3 in front of an object.
   *
   * @param object Reference object (THREE.object3D)
   * @param target Object in front of the user
   * @param distance How far should the object be in front of the object?
   * @param verticalHeight Vertical height
   * @return Position as Vector3
   */
  positionInFrontOf(object, target, distance, verticalHeight): THREE.Vector3 {
    const posObj = new THREE.Vector3();
    const posHelper = new THREE.Vector3();

    posObj.setFromMatrixPosition(object.matrixWorld);
    posHelper.setFromMatrixPosition(target.matrixWorld);

    posHelper.sub(posObj);
    posHelper.y = 0;
    posHelper.normalize();
    posHelper.multiplyScalar(distance);
    posHelper.y = verticalHeight;

    return posObj.add(posHelper);
  }

  registerLookAt(): void {

    if (!this.isRegistered) {
      this.isRegistered = true;

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
}
