(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/kd2-360/kd2-360/ng/src/main.ts */"zUnb");


/***/ }),

/***/ "9+5q":
/*!**************************************************!*\
  !*** ./src/app/features/services/map.service.ts ***!
  \**************************************************/
/*! exports provided: MapService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapService", function() { return MapService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class MapService {
    constructor() {
        this.map = this;
        this.isRegistered = false;
        this.isOpen = false;
    }
    open(position) {
        if (!this.isOpen) {
            this.isOpen = true;
            const map = document.getElementById('nav-map');
            map.dispatchEvent(new CustomEvent('open'));
            map.setAttribute('position', '' + position.x + ' ' + position.y + ' ' + position.z);
            map.setAttribute('visible', 'true');
        }
    }
    close() {
        if (this.isOpen) {
            const map = document.getElementById('nav-map');
            map.dispatchEvent(new CustomEvent('close'));
            // map.setAttribute('visible', 'false');
            this.isOpen = false;
        }
    }
    register() {
        if (!this.isRegistered) {
            this.isRegistered = true;
            const context = this;
            AFRAME.registerComponent('nav-map', {
                init() {
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
                init() {
                    this.el.addEventListener('click', () => {
                        context.map.close();
                    });
                },
            });
        }
    }
}
MapService.ɵfac = function MapService_Factory(t) { return new (t || MapService)(); };
MapService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MapService, factory: MapService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    // Intro
    introScreen: false,
    // Navigation
    sphereSize: .7,
    useSpheres: false,
    useGroundPlate: true,
    useText: false,
    useFloorRings: true,
    // Menu
    menuButtonSmoothing: .2,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Bcyx":
/*!***************************************************!*\
  !*** ./src/app/features/services/menu.service.ts ***!
  \***************************************************/
/*! exports provided: MenuService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuService", function() { return MenuService; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _aframe_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./aframe.service */ "VDXs");
/* harmony import */ var _calc_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./calc.service */ "saEN");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");





class MenuService {
    constructor(aframe, calc, router, ngZone) {
        this.aframe = aframe;
        this.calc = calc;
        this.router = router;
        this.ngZone = ngZone;
        this.isOpen = false;
        this.isRegistered = false;
        this.menu = this;
    }
    open(position) {
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
    close() {
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
    register(map) {
        if (!this.isRegistered) {
            this.isRegistered = true;
            const context = this;
            context.map = map;
            AFRAME.registerComponent('button', {
                schema: {
                    imageSrc: { type: 'string' },
                    text: { type: 'string' }
                },
                init() {
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
                init() {
                    // @ts-ignore
                    context.aframe.camera = document.getElementById('cam-rig').object3D;
                    // @ts-ignore
                    context.aframe.cursor = document.getElementById('cursor').object3D;
                    this.el.addEventListener('click', () => {
                        context.menu.open(context.calc.positionInFrontOf(context.aframe.camera, context.aframe.cursor, 1, -.5));
                        context.map.close();
                    });
                },
                tick() {
                    const pos = this.el.object3D.position;
                    // Calculate target position
                    const posTarget = context.calc.positionInFrontOf(context.aframe.camera, context.aframe.cursor, 2.2, -2.6);
                    // Following the cursor smoothly
                    pos.lerp(posTarget, _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].menuButtonSmoothing);
                }
            });
            // Close menu
            AFRAME.registerComponent('menu-close', {
                init() {
                    this.el.addEventListener('click', () => {
                        context.menu.close();
                    });
                },
            });
            // Button: Map
            AFRAME.registerComponent('menu-open-map', {
                init() {
                    this.el.addEventListener('click', () => {
                        context.menu.close();
                        context.map.open(context.calc.positionInFrontOf(context.aframe.camera, context.aframe.cursor, 1, -.5));
                    });
                },
            });
            // Button: Sign up
            AFRAME.registerComponent('menu-sign-up', {
                init() {
                    this.el.addEventListener('click', () => {
                        context.menu.close();
                        context.router.navigate(['/danke']);
                    });
                },
            });
            // Button: Exit
            AFRAME.registerComponent('menu-exit', {
                init() {
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
    }
}
MenuService.ɵfac = function MenuService_Factory(t) { return new (t || MenuService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_aframe_service__WEBPACK_IMPORTED_MODULE_2__["AframeService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_calc_service__WEBPACK_IMPORTED_MODULE_3__["CalcService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"])); };
MenuService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: MenuService, factory: MenuService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Cavi":
/*!***************************************************!*\
  !*** ./src/app/features/models/custom-vector3.ts ***!
  \***************************************************/
/*! exports provided: CustomVector3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomVector3", function() { return CustomVector3; });
/* harmony import */ var aframe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aframe */ "sEhn");
/* harmony import */ var aframe__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aframe__WEBPACK_IMPORTED_MODULE_0__);
// declare var THREE: any;

class CustomVector3 extends aframe__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3 {
    constructor() {
        super(...arguments);
        this.TO_RADIANS = Math.PI / 180;
    }
    rotateY(angle) {
        const cosRY = Math.cos(angle * this.TO_RADIANS);
        const sinRY = Math.sin(angle * this.TO_RADIANS);
        const tempz = this.z;
        const tempx = this.x;
        this.x = (tempx * cosRY) + (tempz * sinRY);
        this.z = (tempx * -sinRY) + (tempz * cosRY);
    }
    rotateX(angle) {
        const cosRY = Math.cos(angle * this.TO_RADIANS);
        const sinRY = Math.sin(angle * this.TO_RADIANS);
        const tempz = this.z;
        const tempy = this.y;
        this.y = (tempy * cosRY) + (tempz * sinRY);
        this.z = (tempy * -sinRY) + (tempz * cosRY);
    }
    rotateZ(angle) {
        const cosRY = Math.cos(angle * this.TO_RADIANS);
        const sinRY = Math.sin(angle * this.TO_RADIANS);
        const tempx = this.x;
        const tempy = this.y;
        this.y = (tempy * cosRY) + (tempx * sinRY);
        this.x = (tempy * -sinRY) + (tempx * cosRY);
    }
}


/***/ }),

/***/ "HO0/":
/*!************************************************!*\
  !*** ./src/app/features/models/particle3-d.ts ***!
  \************************************************/
/*! exports provided: Particle3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Particle3D", function() { return Particle3D; });
/* harmony import */ var aframe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aframe */ "sEhn");
/* harmony import */ var aframe__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aframe__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _custom_vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-vector3 */ "Cavi");
// import * as THREE from 'super-three';
// declare var THREE: any;


class Particle3D extends aframe__WEBPACK_IMPORTED_MODULE_0__["THREE"].Sprite {
    constructor(material) {
        super(material);
        // this.material = material instanceof Array ? material : [ material ];
        // define properties
        this.velocity = new _custom_vector3__WEBPACK_IMPORTED_MODULE_1__["CustomVector3"](0, -.17, 0);
        this.velocity.rotateX(this.randomRange(-45, 45));
        this.velocity.rotateY(this.randomRange(0, 360));
        this.gravity = new _custom_vector3__WEBPACK_IMPORTED_MODULE_1__["CustomVector3"](0, 0, 0);
        this.drag = 1;
        // methods...
    }
    updatePhysics() {
        this.velocity.multiplyScalar(this.drag);
        this.velocity.add(this.gravity);
        this.position.add(this.velocity);
    }
    randomRange(min, max) {
        return ((Math.random() * (max - min)) + min);
    }
}


/***/ }),

/***/ "I4gk":
/*!*********************************************************!*\
  !*** ./src/app/features/services/navigation.service.ts ***!
  \*********************************************************/
/*! exports provided: NavigationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationService", function() { return NavigationService; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _calc_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calc.service */ "saEN");



class NavigationService {
    constructor(calc) {
        this.calc = calc;
        this.currentSphere = null; // Current main sphere
        this.nav = this;
        this.isRegistered = false;
        this.initialized = false; // Program initialized?
        this.isTransitioning = false; // Allow only one transition at the same time
    }
    // Set all spheres invisible
    setAllInvisible() {
        document.querySelectorAll('[id^="sky-"]').forEach((sphere => sphere.setAttribute('scale', '.001 .001 .001')));
    }
    // Set sphere as main
    setMainSphere(sphere, neighbourIds) {
        console.log(sphere);
        this.currentSphere = sphere;
        document.getElementById(sphere.id).setAttribute('scale', '1 1 1');
        // child 0: Sphere
        // child 1: Payload
        // child 2: Floor ring
        // child 3: Link
        sphere.children[0].setAttribute('radius', '100');
        sphere.children[0].setAttribute('material', 'opacity: 1; color: #FFF');
        sphere.children[0].setAttribute('visible', 'true');
        sphere.children[1].setAttribute('visible', 'true');
        sphere.children[1].setAttribute('scale', '1 1 1');
        sphere.children[2].setAttribute('visible', 'false');
        sphere.children[3].setAttribute('visible', 'false');
        sphere.children[3].setAttribute('scale', '.0001 .0001 .0001');
        sphere.neighbourIds = Array.from(neighbourIds);
    }
    // Set sphere as neighbour
    setNeighbour(sphere) {
        if (sphere != null) {
            document.getElementById(sphere.id).setAttribute('scale', '1 1 1');
            // Sphere
            if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].useSpheres) {
                sphere.children[0].setAttribute('visible', 'true');
                sphere.children[0].setAttribute('radius', _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].sphereSize.toString());
                sphere.children[0].setAttribute('material', 'opacity: .7; color: #AAA');
            }
            else {
                sphere.children[0].setAttribute('visible', 'false');
            }
            sphere.children[1].setAttribute('visible', 'false');
            sphere.children[1].setAttribute('scale', '.0001 .0001 .0001');
            // if (!environment.useText) {
            //   sphere.children[2].children[0].children[0].children[0].setAttribute('visible', 'false');
            // }
            // if (!environment.useText && !environment.useSpheres) {
            //   sphere.children[2].setAttribute('position', '0 -2 0');
            // } // Set link position to floor ring
            if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].useFloorRings) {
                sphere.children[2].setAttribute('visible', 'true');
                sphere.children[3].setAttribute('scale', '1 1 1');
            }
        }
    }
    // Meta function: Sets main and neighbour spheres
    updateMainSphere(sphere, neighbourIds) {
        this.setAllInvisible();
        this.setMainSphere(sphere, neighbourIds);
        neighbourIds.forEach((id) => this.setNeighbour(document.getElementById('sky-' + id)));
    }
    register(map, menu) {
        if (!this.isRegistered) {
            this.isRegistered = true;
            const context = this;
            context.map = map;
            context.menu = menu;
            // Attribute: Initial sphere
            AFRAME.registerComponent('initial-sphere', {
                schema: {
                    next: { type: 'array' }
                },
                init() {
                    if (!context.initialized) {
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
                    next: { type: 'array' }
                },
                init() {
                    const self = this;
                    // Create navigation jump marker (circle on the floor)
                    const jumpMarker = document.createElement('a-entity');
                    jumpMarker.setAttribute('position', '0 -2 0');
                    jumpMarker.setAttribute('visible', 'false');
                    const oCircle = document.createElement('a-circle');
                    oCircle.setAttribute('color', '#888888');
                    oCircle.setAttribute('radius', '.25');
                    oCircle.setAttribute('rotation', '-90 0 0');
                    const iCircle = document.createElement('a-circle');
                    iCircle.setAttribute('color', '#444444');
                    iCircle.setAttribute('radius', '.17');
                    iCircle.setAttribute('rotation', '-90 0 0');
                    iCircle.setAttribute('position', '0 .01 0');
                    jumpMarker.appendChild(oCircle);
                    jumpMarker.appendChild(iCircle);
                    this.el.appendChild(jumpMarker);
                    // Create Link
                    const link = document.createElement('a-entity');
                    link.setAttribute('position', '0 -2 0');
                    link.setAttribute('look-at', '[camera]');
                    link.setAttribute('mixin', 'm-link');
                    link.setAttribute('class', 'link');
                    this.el.appendChild(link);
                    // Navigate on Click
                    link.addEventListener('click', () => {
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
                init() {
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
NavigationService.ɵfac = function NavigationService_Factory(t) { return new (t || NavigationService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_calc_service__WEBPACK_IMPORTED_MODULE_2__["CalcService"])); };
NavigationService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: NavigationService, factory: NavigationService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "KcuI":
/*!***************************************************!*\
  !*** ./src/app/features/services/snow.service.ts ***!
  \***************************************************/
/*! exports provided: SnowService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnowService", function() { return SnowService; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ "AytR");
/* harmony import */ var aframe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aframe */ "sEhn");
/* harmony import */ var aframe__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aframe__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models_particle3_d__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/particle3-d */ "HO0/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class SnowService {
    constructor() {
        this.isRegistered = false;
    }
    register() {
        if (!this.isRegistered) {
            this.isRegistered = true;
            AFRAME.registerComponent('snow', {
                init() {
                    const self = this;
                    let particle;
                    this.particles = [];
                    if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].introScreen) {
                        const scene = this.el.sceneEl.object3D;
                        // Disable curtain
                        document.getElementById('curtain').setAttribute('visible', 'false');
                        const particleImage = new Image(); // THREE.ImageUtils.loadTexture( "http://i.imgur.com/cTALZ.png" );
                        particleImage.src = 'assets/snow.png';
                        const material = new aframe__WEBPACK_IMPORTED_MODULE_1__["THREE"].PointsMaterial({ map: new aframe__WEBPACK_IMPORTED_MODULE_1__["THREE"].Texture(particleImage) });
                        for (let i = 0; i < 500; i++) {
                            particle = new _models_particle3_d__WEBPACK_IMPORTED_MODULE_2__["Particle3D"](material);
                            particle.position.x = Math.random() * 200 - 100;
                            particle.position.y = Math.random() * 200 - 100;
                            particle.position.z = Math.random() * 200 - 195;
                            particle.scale.x = particle.scale.y = .25;
                            scene.add(particle);
                            this.particles.push(particle);
                        }
                    }
                    // Todo: True onload
                    const waitingTime = _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].introScreen ? 15000 : 1;
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
                tick() {
                    if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].introScreen) {
                        this.particles.forEach((particle) => {
                            particle.updatePhysics();
                            const pp = particle.position;
                            if (pp.y < -10) {
                                pp.y += 110;
                            }
                            if (pp.x > 100) {
                                pp.x -= 200;
                            }
                            else if (pp.x < -100) {
                                pp.x += 200;
                            }
                            if (pp.z > 5) {
                                pp.z -= 100;
                            }
                            else if (pp.z < -100) {
                                pp.z += 105;
                            }
                        });
                    }
                },
                remove() {
                    this.particles.forEach((particle) => {
                        particle.geometry.dispose();
                        particle.material.dispose();
                        this.el.sceneEl.object3D.remove(particle);
                    });
                }
            });
        }
    }
}
SnowService.ɵfac = function SnowService_Factory(t) { return new (t || SnowService)(); };
SnowService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: SnowService, factory: SnowService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");




class AppComponent {
    constructor() {
        this.title = 'KD2 Lab 360° Tour';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 6, vars: 1, consts: [["fxLayout", "column", "fxFill", ""], ["fxLayout", "row"], ["color", "primary"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.title);
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["FlexFillDirective"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__["MatToolbar"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "TtDS":
/*!*************************************************************!*\
  !*** ./src/app/features/pages/welcome/welcome.component.ts ***!
  \*************************************************************/
/*! exports provided: WelcomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeComponent", function() { return WelcomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");





class WelcomeComponent {
    constructor() { }
    ngOnInit() {
    }
}
WelcomeComponent.ɵfac = function WelcomeComponent_Factory(t) { return new (t || WelcomeComponent)(); };
WelcomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WelcomeComponent, selectors: [["app-welcome"]], decls: 27, vars: 0, consts: [["fxLayout", "row"], ["fxLayout", "column", "fxFlex", "20"], ["fxLayout", "column", "fxFlex", "60"], ["fxLayout", "row", "fxFlexOffset", "10px"], ["fxLayout", "column", "fxFill", ""], ["routerLink", "/tour", "mat-raised-button", "", "color", "primary"], ["fxLayout", "column", "fxFlex", ""]], template: function WelcomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Tour durch das KD2 Lab");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Willkommen!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Im Folgenden kann das KD2 des iism virtuell besichtigt werden.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "So funktioniert es");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Hier wird erkl\u00E4rt, wie die Tour funktioniert.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Hier geht es weiter zur Tour:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "360\u00B0 Tour");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["DefaultFlexDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["DefaultFlexOffsetDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["FlexFillDirective"], _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCard"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLink"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ3ZWxjb21lLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "VDXs":
/*!*****************************************************!*\
  !*** ./src/app/features/services/aframe.service.ts ***!
  \*****************************************************/
/*! exports provided: AframeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AframeService", function() { return AframeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class AframeService {
    constructor() { }
}
AframeService.ɵfac = function AframeService_Factory(t) { return new (t || AframeService)(); };
AframeService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AframeService, factory: AframeService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/layout */ "0MNC");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _features_pages_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./features/pages/welcome/welcome.component */ "TtDS");
/* harmony import */ var _features_pages_tour_tour_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./features/pages/tour/tour.component */ "sv9q");
/* harmony import */ var _features_pages_debriefing_debriefing_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./features/pages/debriefing/debriefing.component */ "t/X2");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _features_components_aframe_aframe_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./features/components/aframe/aframe.component */ "arKF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ "fXoL");

















class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_14__["AppRoutingModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
            _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_6__["LayoutModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_8__["MatSidenavModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_10__["MatListModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"],
        _features_pages_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_11__["WelcomeComponent"],
        _features_pages_tour_tour_component__WEBPACK_IMPORTED_MODULE_12__["TourComponent"],
        _features_pages_debriefing_debriefing_component__WEBPACK_IMPORTED_MODULE_13__["DebriefingComponent"],
        _features_components_aframe_aframe_component__WEBPACK_IMPORTED_MODULE_15__["AframeComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_14__["AppRoutingModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
        _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_6__["LayoutModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_8__["MatSidenavModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_10__["MatListModule"]] }); })();


/***/ }),

/***/ "arKF":
/*!****************************************************************!*\
  !*** ./src/app/features/components/aframe/aframe.component.ts ***!
  \****************************************************************/
/*! exports provided: AframeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AframeComponent", function() { return AframeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_navigation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/navigation.service */ "I4gk");
/* harmony import */ var _services_menu_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/menu.service */ "Bcyx");
/* harmony import */ var _services_calc_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/calc.service */ "saEN");
/* harmony import */ var _services_map_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/map.service */ "9+5q");
/* harmony import */ var _services_snow_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/snow.service */ "KcuI");






class AframeComponent {
    constructor(nav, menu, calc, map, snow) {
        this.nav = nav;
        this.menu = menu;
        this.calc = calc;
        this.map = map;
        this.snow = snow;
    }
    ngOnInit() {
        this.menu.register(this.map);
        this.nav.register(this.map, this.menu);
        this.map.register();
        this.snow.register();
        this.calc.registerLookAt();
    }
}
AframeComponent.ɵfac = function AframeComponent_Factory(t) { return new (t || AframeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_navigation_service__WEBPACK_IMPORTED_MODULE_1__["NavigationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_menu_service__WEBPACK_IMPORTED_MODULE_2__["MenuService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_calc_service__WEBPACK_IMPORTED_MODULE_3__["CalcService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_map_service__WEBPACK_IMPORTED_MODULE_4__["MapService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_snow_service__WEBPACK_IMPORTED_MODULE_5__["SnowService"])); };
AframeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AframeComponent, selectors: [["app-aframe"]], decls: 139, vars: 0, consts: [["stats", ""], ["timeout", "1000"], ["id", "click-sound", "crossorigin", "anonymous", "src", "https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg", "preload", "auto"], ["id", "img-map", "crossorigin", "anonymous", "src", "assets/map.png", "alt", "Picture"], ["id", "img-55", "crossorigin", "anonymous", "src", "assets/pics/R0010055.JPG", "alt", "Picture"], ["id", "img-52", "crossorigin", "anonymous", "src", "assets/pics/R0010052.JPG", "alt", "Picture"], ["id", "img-56", "crossorigin", "anonymous", "src", "assets/pics/R0010056.JPG", "alt", "Picture"], ["id", "img-57", "crossorigin", "anonymous", "src", "assets/pics/R0010057.JPG", "alt", "Picture"], ["id", "img-24", "crossorigin", "anonymous", "src", "assets/pics/R0010024.JPG", "alt", "Picture"], ["id", "img-25", "crossorigin", "anonymous", "src", "assets/pics/R0010025.JPG", "alt", "Picture"], ["id", "img-26", "crossorigin", "anonymous", "src", "assets/pics/R0010026.JPG", "alt", "Picture"], ["id", "img-27", "crossorigin", "anonymous", "src", "assets/pics/R0010027.JPG", "alt", "Picture"], ["id", "img-28", "crossorigin", "anonymous", "src", "assets/pics/R0010028.JPG", "alt", "Picture"], ["id", "img-30", "crossorigin", "anonymous", "src", "assets/pics/R0010030.JPG", "alt", "Picture"], ["id", "img-35", "crossorigin", "anonymous", "src", "assets/pics/R0010035.JPG", "alt", "Picture"], ["id", "img-39", "crossorigin", "anonymous", "src", "assets/pics/R0010039.JPG", "alt", "Picture"], ["id", "img-41", "crossorigin", "anonymous", "src", "assets/pics/R0010041.JPG", "alt", "Picture"], ["id", "img-43", "crossorigin", "anonymous", "src", "assets/pics/R0010043.JPG", "alt", "Picture"], ["id", "img-45", "crossorigin", "anonymous", "src", "assets/pics/R0010045.JPG", "alt", "Picture"], ["id", "img-49", "crossorigin", "anonymous", "src", "assets/pics/R0010049.JPG", "alt", "Picture"], ["id", "img-51", "crossorigin", "anonymous", "src", "assets/pics/R0010051.JPG", "alt", "Picture"], ["id", "img-53", "crossorigin", "anonymous", "src", "assets/pics/R0010053.JPG", "alt", "Picture"], ["id", "img-54", "crossorigin", "anonymous", "src", "assets/pics/R0010054.JPG", "alt", "Picture"], ["id", "img-58", "crossorigin", "anonymous", "src", "assets/pics/R0010058.JPG", "alt", "Picture"], ["id", "img-60", "crossorigin", "anonymous", "src", "assets/pics/R0010060.JPG", "alt", "Picture"], ["id", "img-61", "crossorigin", "anonymous", "src", "assets/pics/R0010061.JPG", "alt", "Picture"], ["id", "img-62", "crossorigin", "anonymous", "src", "assets/pics/R0010062.JPG", "alt", "Picture"], ["id", "img-65", "crossorigin", "anonymous", "src", "assets/pics/R0010065.JPG", "alt", "Picture"], ["id", "img-poster", "crossorigin", "anonymous", "src", "assets/media/poster.png", "alt", "Picture"], ["id", "icon-signup", "crossorigin", "anonymous", "src", "assets/icons/signup.png", "alt", "Picture"], ["id", "icon-map", "crossorigin", "anonymous", "src", "assets/icons/map.png", "alt", "Picture"], ["id", "icon-restart", "crossorigin", "anonymous", "src", "assets/icons/redo.png", "alt", "Picture"], ["id", "icon-exit", "crossorigin", "anonymous", "src", "assets/icons/leave.png", "alt", "Picture"], ["id", "icon-minimize", "crossorigin", "anonymous", "src", "assets/icons/exit.png", "alt", "Picture"], ["id", "icon-menu", "crossorigin", "anonymous", "src", "assets/icons/bars.png", "alt", "Picture"], ["id", "m-sky", "radius", ".7", "material", "shader: flat; opacity: .7; color: #AAA", "visible", "false", 1, "pic360"], ["id", "m-link", "geometry", "primitive: plane; height: .5; width: .5", "material", "shader: flat; opacity: 0", "visible", "true", "sound", "on: click; src: #click-sound"], ["id", "menu-animations", "animation__open", "property: scale; startEvents: open; easing: easeInCubic; dur: 300; from: .0001 .0001 .0001; to: 1 1 1", "animation__close", "property: scale; startEvents: close; easing: easeInCubic; dur: 300; from: 1 1 1; to: .0001 .0001 .0001", "animation__closeend", "property: visible; type: boolean; to: false; startEvents: animationcomplete__close"], ["id", "hover-scale", "animation__mouseenter_scale", "property: scale; startEvents: mouseenter; easing: easeOutCubic; dur: 300; to: 1.2 1.2 1.2", "animation__mouseleave_scale", "property: scale; startEvents: mouseleave; easing: easeOutCubic; dur: 300; to: 1 1 1"], ["id", "poster", "opacity", "0", "shader", "flat", "color", "#666", "look-at", "[camera]", "animation__increase", "property: scale; startEvents: mouseenter; to: 6 6 6; easing: easeOutQuad;", "animation__decrease", "property: scale; startEvents: mouseleave; to: 1 1 1; easing: easeOutQuad;"], ["id", "sky-52", "position", "-4 0 0", "data-text", "Foyer", "nav", "next: 55, 56, 57, 51"], ["mixin", "m-sky", "src", "#img-52", "rotation", "0 -90 0"], [1, "payload"], ["id", "sky-55", "position", "0 0 0", "data-text", "Eingang", "nav", "next: 52, 56, 57", "click-nav", ""], ["mixin", "m-sky", "src", "#img-55", "rotation", "0 180 0"], ["height", "1", "width", ".707", "position", "2 0 -2", "mixin", "poster", 1, "hover"], ["src", "#img-poster", "height", "1", "width", ".707"], ["id", "sky-56", "position", ".02 0 -2", "data-text", "Empfang", "nav", "next: 52, 55, 57"], ["mixin", "m-sky", "src", "#img-56", "rotation", "0 180 0"], ["id", "sky-54", "position", "-4 0 -6", "data-text", "Durchgang", "nav", "next: 58, 57"], ["mixin", "m-sky", "src", "#img-54", "rotation", "0 180 0"], ["id", "sky-57", "position", "-4 0 -2", "data-text", "Foyer", "nav", "next: 52, 54, 55, 56"], ["mixin", "m-sky", "src", "#img-57", "rotation", "0 180 0"], ["id", "sky-58", "position", "-4 0 -15", "data-text", "Zu Lab A", "nav", "next: 54, 60"], ["mixin", "m-sky", "src", "#img-58", "rotation", "0 180 0"], ["id", "sky-24", "position", "-11 0 -14", "data-text", "Cockpit", "nav", "next: 28, 60, 25"], ["mixin", "m-sky", "src", "#img-24", "rotation", "0 180 0"], ["id", "sky-25", "position", "-11 0 -8", "data-text", "A Mitte", "nav", "next: 24, 26"], ["mixin", "m-sky", "src", "#img-25", "rotation", "0 180 0"], ["id", "sky-26", "position", "-11 0 -5", "data-text", "A Mitte", "nav", "next: 25, 27"], ["mixin", "m-sky", "src", "#img-26", "rotation", "0 180 0"], ["id", "sky-27", "position", "-11 0 -2", "data-text", "A Mitte", "nav", "next: 26"], ["mixin", "m-sky", "src", "#img-27", "rotation", "0 180 0"], ["id", "sky-28", "position", "-16 0 -14", "data-text", "A-01", "nav", "next: 24, 30"], ["mixin", "m-sky", "src", "#img-28", "rotation", "0 90 0"], ["id", "sky-30", "position", "-16 0 -10", "data-text", "A-03", "nav", "next: 28, 35"], ["mixin", "m-sky", "src", "#img-30", "rotation", "0 0 0"], ["id", "sky-35", "position", "-16 0 -6", "data-text", "Zu Lab B", "nav", "next: 30, 43, 51"], ["mixin", "m-sky", "src", "#img-35", "rotation", "0 -90 0"], ["id", "sky-60", "position", "-6 0 -15", "data-text", "Lab A", "nav", "next: 58, 24, 61"], ["mixin", "m-sky", "src", "#img-60", "rotation", "0 180 0"], ["id", "sky-61", "position", "-6 0 -8", "data-text", "A-14", "nav", "next: 60, 62"], ["mixin", "m-sky", "src", "#img-61", "rotation", "0 180 0"], ["id", "sky-62", "position", "-6 0 -5", "data-text", "A-17", "nav", "next: 61, 65"], ["mixin", "m-sky", "src", "#img-62", "rotation", "0 180 0"], ["id", "sky-65", "position", "-6 0 -2", "data-text", "A-20", "nav", "next: 62"], ["mixin", "m-sky", "src", "#img-65", "rotation", "0 0 0"], ["id", "sky-43", "position", "-24 0 -6", "data-text", "B-01", "nav", "next: 35, 41, 45"], ["mixin", "m-sky", "src", "#img-43", "rotation", "0 -90 0"], ["id", "sky-41", "position", "-26 0 -6", "data-text", "B Gang", "nav", "next: 39, 43"], ["mixin", "m-sky", "src", "#img-41", "rotation", "0 0 0"], ["id", "sky-45", "position", "-24 0 -4", "data-text", "B-01", "nav", "next: 43"], ["mixin", "m-sky", "src", "#img-45", "rotation", "0 0 0"], ["id", "sky-39", "position", "-26 0 0", "data-text", "B Ausgang", "nav", "next: 41, 51"], ["mixin", "m-sky", "src", "#img-39", "rotation", "0 90 0"], ["id", "sky-51", "position", "-16 0 0", "data-text", "B-18", "nav", "next: 39, 35, 49, 52"], ["mixin", "m-sky", "src", "#img-51", "rotation", "0 -90 0"], ["id", "sky-49", "position", "-16 0 2", "data-text", "B-18", "nav", "next: 51"], ["mixin", "m-sky", "src", "#img-49", "rotation", "0 90 0"], ["id", "cam-rig", "position", "0 50 0"], ["camera", "", "position", "0 0 0", "look-controls", "pointerLockEnabled: true", "wasd-controls", "acceleration: 25"], ["id", "cursor", "cursor", "fuse: true; fuseTimeout: 1700", "material", "color: black; shader: flat", "position", "0 0 -1", "geometry", "primitive: ring; radiusInner: 0.02; radiusOuter: 0.03", "animation__click_deactivate_fuse", "property: cursor.fuse; startEvents: mousedown; to: false; dur: 10; delay: 20", "animation__click_reactivate_fuse", "property: cursor.fuse; startEvents: mouseup; to: true; dur: 10", "animation__click", "property: scale; startEvents: mousedown; easing: easeInCubic; dur: 170; from: 0.3 0.3 0.3; to: 1 1 1; delay: 20", "animation__fusing", "property: scale; startEvents: fusing; easing: easeInCubic; from: 1 1 1; to: 0.3 0.3 0.3; dur: 1500", "animation__fusing2", "property: scale; startEvents: animationcomplete__fusing; easing: easeInCubic; to: 1 1 1; dur: 100; delay: 100", "animation__mouseenter", "property: components.material.material.color; type: color; to: #999; easing: linear; startEvents: mouseenter; dur: 1200", "animation__mouseleave_color", "property: components.material.material.color; type: color; to: #000; startEvents: mouseleave; dur: 200", "animation__mouseleave_scale", "property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 300; to: 1 1 1", "raycaster", "objects: .link", "proxy-event", "event: mousedown; to: #cursor; as: nav-click", "click-nav", ""], ["id", "cursor-invisible", "cursor", "fuse: false", "position", "0 0 -1", "raycaster", "objects: .hover"], ["id", "curtain", "radius", ".4", "color", "#000", "opacity", "0", "side", "double", "visible", "true", "animation__fade", "property: components.material.material.opacity; type: number; from: 0; to: 1; dur: 150; startEvents: fade", "animation__fadeback", "property: components.material.material.opacity; type: number; from: 1; to: 0; delay: 170; dur: 150; startEvents: animationcomplete__fade", "animation__fadelong", "property: components.material.material.opacity; type: number; from: 0; to: 1; dur: 500; startEvents: fadelong", "animation__fadelongback", "property: components.material.material.opacity; type: number; from: 1; to: 0; dur: 1000; startEvents: fadelongback", "animation__fadeend", "property: visible; type: boolean; to: false; startEvents: animationcomplete__fadeback", "animation__fadelongend", "property: visible; type: boolean; to: false; startEvents: animationcomplete__fadelongback"], ["position", "0 -6 0", "visible", "true", 1, "circle"], ["color", "#282424", "radius", "2", "rotation", "-90 0 0"], ["id", "open-menu", "menu-open", "", "look-at", "[camera]", "button", "imageSrc: #icon-menu; text: Menu", "mixin", "m-link menu-animations", "material", "opacity: .1", 1, "link"], ["id", "menu", "position", "0 -.5 -1", "look-at", "[camera]", "visible", "false", "scale", ".0001 .0001 .0001", "mixin", "menu-animations"], ["color", "#666", "height", ".4", "width", "1.7", "position", "0 0 -.02", "shader", "flat", "opacity", ".5"], ["position", "-.6 0 0", "button", "imageSrc: #icon-signup; text: Anmelden", "menu-sign-up", "", "mixin", "m-link hover-scale", 1, "link"], ["position", "-.2 0 0", "button", "imageSrc: #icon-map; text: Karte", "menu-open-map", "", "mixin", "m-link hover-scale", 1, "link"], ["position", ".2 0 0", "button", "imageSrc: #icon-restart; text: Zum Start", "menu-open-map", "", "mixin", "m-link hover-scale", 1, "link"], ["position", ".6 0 0", "button", "imageSrc: #icon-exit; text: Beenden", "menu-exit", "", "mixin", "m-link hover-scale", 1, "link"], ["scale", ".4 .4 .4", "position", ".75 .15 .1"], ["button", "imageSrc: #icon-minimize; text: ", "menu-close", "", "mixin", "m-link hover-scale", 1, "link"], ["radius", ".12", "position", "0 .0375 0", "color", "#666", "shader", "flat", "opacity", "1"], ["id", "nav-map", "position", "0 -0.2 -1", "look-at", "[camera]", "visible", "false", "scale", ".0001 .0001 .0001", "mixin", "menu-animations", "nav-map", ""], ["color", "#666", "height", ".5", "width", ".92", "position", "0 0 -.02", "shader", "flat"], ["src", "#img-map", "height", ".4", "width", ".8"], ["radius", ".03", "position", "-0.4 .2 .02", "color", "#AA0000", "shader", "flat", "animation__blink", "property: radius; from: .03; to:0.015; dur: 1000; easing: easeInQuad; startEvents: blink, animationcomplete__blinkback;", "animation__blinkback", "property: radius; from: .015; to:0.03; dur: 1000; delay: 50; easing: easeOutQuad; startEvents: animationcomplete__blink;"], ["scale", ".4 .4 .4", "position", ".38 .17 .1"], ["button", "imageSrc: #icon-minimize; text: ", "nav-map-close", "", "mixin", "m-link hover-scale", 1, "link"], ["id", "welcome", "position", "0 50 0"], ["id", "w-sphere", "radius", "100", "color", "#999", "opacity", "1", "side", "double", "snow", ""], ["value", "Willkommen bei der 360 Grad Tour des KD2-Labs!", "position", "0 0 -2", "color", "#000", "side", "double", "align", "center", "look-at", "[camera]"], ["value", "Laden ...", "position", "0 -.6 -2", "color", "#000", "side", "double", "align", "center", "look-at", "[camera]"]], template: function AframeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a-scene", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a-assets", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "audio", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "img", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "img", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "img", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "img", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "img", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "img", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "img", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "img", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "img", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "img", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "img", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "img", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "img", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "img", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "img", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "img", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "img", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "img", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "img", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "img", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "img", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "img", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "img", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "a-mixin", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "a-mixin", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "a-mixin", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "a-mixin", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "a-mixin", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "a-entity", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "a-sky", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "a-entity", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "a-sky", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "a-plane", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "a-image", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "a-entity", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "a-sky", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "a-entity", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](52, "a-sky", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "a-entity", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "a-sky", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "a-entity", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](58, "a-sky", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](59, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "a-entity", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](61, "a-sky", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "a-entity", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](64, "a-sky", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "a-entity", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "a-sky", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](68, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "a-entity", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "a-sky", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "a-entity", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "a-sky", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](74, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "a-entity", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](76, "a-sky", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](77, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "a-entity", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](79, "a-sky", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](80, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "a-entity", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](82, "a-sky", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](83, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "a-entity", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](85, "a-sky", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](86, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "a-entity", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](88, "a-sky", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](89, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "a-entity", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](91, "a-sky", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](92, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "a-entity", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](94, "a-sky", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](95, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "a-entity", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](97, "a-sky", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](98, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "a-entity", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](100, "a-sky", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](101, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "a-entity", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "a-sky", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](104, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "a-entity", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](106, "a-sky", 86);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](107, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "a-entity", 87);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](109, "a-sky", 88);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](110, "a-entity", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "a-entity", 89);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "a-entity", 90);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](113, "a-entity", 91);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](114, "a-entity", 92);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](115, "a-sphere", 93);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "a-entity", 94);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](117, "a-circle", 95);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](118, "a-entity", 96);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "a-entity", 97);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](120, "a-plane", 98);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](121, "a-entity", 99);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](122, "a-entity", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](123, "a-entity", 101);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](124, "a-entity", 102);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "a-entity", 103);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](126, "a-entity", 104);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](127, "a-circle", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "a-entity", 106);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](129, "a-plane", 107);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](130, "a-image", 108);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](131, "a-circle", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "a-entity", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](133, "a-entity", 111);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](134, "a-circle", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "a-entity", 112);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "a-sphere", 113);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](137, "a-text", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](138, "a-text", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZnJhbWUuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "saEN":
/*!***************************************************!*\
  !*** ./src/app/features/services/calc.service.ts ***!
  \***************************************************/
/*! exports provided: CalcService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalcService", function() { return CalcService; });
/* harmony import */ var aframe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aframe */ "sEhn");
/* harmony import */ var aframe__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aframe__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
// import * as THREE from 'super-three';
// declare var THREE: any;


class CalcService {
    constructor() {
        this.isRegistered = false;
    }
    // Check visibility
    // From: https://gist.github.com/Strae/7def0f84677e03727f771636709b448f
    checkIfVisible(entity) {
        const entityMesh = entity.object3DMap.mesh;
        const frustum = new aframe__WEBPACK_IMPORTED_MODULE_0__["THREE"].Frustum();
        const cameraViewProjectionMatrix = new aframe__WEBPACK_IMPORTED_MODULE_0__["THREE"].Matrix4();
        let camera;
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
    positionInFrontOf(object, target, distance, verticalHeight) {
        const posObj = new aframe__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3();
        const posHelper = new aframe__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3();
        posObj.setFromMatrixPosition(object.matrixWorld);
        posHelper.setFromMatrixPosition(target.matrixWorld);
        posHelper.sub(posObj);
        posHelper.y = 0;
        posHelper.normalize();
        posHelper.multiplyScalar(distance);
        posHelper.y = verticalHeight;
        return posObj.add(posHelper);
    }
    registerLookAt() {
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
                    parse(value) {
                        // A static position to look at.
                        if (isCoordinates(value) || typeof value === 'object') {
                            return coordinates.parse(value);
                        }
                        // A selector to a target entity.
                        return value;
                    },
                    stringify(data) {
                        if (typeof data === 'object') {
                            return coordinates.stringify(data);
                        }
                        return data;
                    }
                },
                init() {
                    this.target3D = null;
                    this.vector = new aframe__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3();
                    // @ts-ignore
                    this.cameraListener = AFRAME.utils.bind(this.cameraListener, this);
                    this.el.addEventListener('componentinitialized', this.cameraListener);
                    this.el.addEventListener('componentremoved', this.cameraListener);
                },
                /**
                 * If tracking an object, this will be called on every tick.
                 * If looking at a position vector, this will only be called once (until further updates).
                 */
                update() {
                    const self = this;
                    const target = self.data;
                    let targetEl;
                    // No longer looking at anything (i.e., look-at="").
                    if (!target || (typeof target === 'object' && !Object.keys(target).length)) {
                        return self.remove();
                    }
                    // Look at a position.
                    if (typeof target === 'object') {
                        return this.lookAt(new aframe__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3(target.x, target.y, target.z));
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
                tick() {
                    const self = this;
                    const vec3 = new aframe__WEBPACK_IMPORTED_MODULE_0__["THREE"].Vector3();
                    const target3D = self.target3D;
                    if (target3D) {
                        target3D.getWorldPosition(vec3);
                        self.lookAt(vec3);
                    }
                },
                remove() {
                    this.el.removeEventListener('componentinitialized', this.cameraListener);
                    this.el.removeEventListener('componentremoved', this.cameraListener);
                },
                beginTracking(targetEl) {
                    this.target3D = targetEl.object3D;
                },
                cameraListener(e) {
                    if (e.detail && e.detail.name === 'camera') {
                        this.update();
                    }
                },
                lookAt(position) {
                    const vector = this.vector;
                    const object3D = this.el.object3D;
                    if (this.el.getObject3D('camera')) {
                        // Flip the vector to -z, looking away from target for camera entities. When using
                        // lookat from THREE camera objects, this is applied for you, but since the camera is
                        // nested into a Object3D, we need to apply this manually.
                        vector.subVectors(object3D.position, position).add(object3D.position);
                    }
                    else {
                        vector.copy(position);
                    }
                    object3D.lookAt(vector);
                }
            });
        }
    }
}
CalcService.ɵfac = function CalcService_Factory(t) { return new (t || CalcService)(); };
CalcService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CalcService, factory: CalcService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "sv9q":
/*!*******************************************************!*\
  !*** ./src/app/features/pages/tour/tour.component.ts ***!
  \*******************************************************/
/*! exports provided: TourComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TourComponent", function() { return TourComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_aframe_aframe_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/aframe/aframe.component */ "arKF");


class TourComponent {
    constructor() { }
    ngOnInit() {
    }
}
TourComponent.ɵfac = function TourComponent_Factory(t) { return new (t || TourComponent)(); };
TourComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TourComponent, selectors: [["app-tour"]], decls: 1, vars: 0, template: function TourComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-aframe");
    } }, directives: [_components_aframe_aframe_component__WEBPACK_IMPORTED_MODULE_1__["AframeComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0b3VyLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "t/X2":
/*!*******************************************************************!*\
  !*** ./src/app/features/pages/debriefing/debriefing.component.ts ***!
  \*******************************************************************/
/*! exports provided: DebriefingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DebriefingComponent", function() { return DebriefingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");





class DebriefingComponent {
    constructor() { }
    ngOnInit() {
    }
}
DebriefingComponent.ɵfac = function DebriefingComponent_Factory(t) { return new (t || DebriefingComponent)(); };
DebriefingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DebriefingComponent, selectors: [["app-debriefing"]], decls: 20, vars: 0, consts: [["fxLayout", "row"], ["fxLayout", "column", "fxFlex", "20"], ["fxLayout", "column", "fxFlex", "60"], ["fxLayout", "row", "fxFlexOffset", "10px"], ["fxLayout", "column", "fxFill", ""], ["routerLink", "/anmeldung", "mat-raised-button", "", "color", "primary"], ["fxLayout", "column", "fxFlex", ""]], template: function DebriefingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Tour durch das KD2 Lab");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Vielen Dank, dass Sie die Tour gemacht haben!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Melden Sie sich gerne an, um an unseren Experimenten teilzunehmen.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "An Experimenten des KD2 Labs teilnehmen:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Anmelden");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["DefaultFlexDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["DefaultFlexOffsetDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["FlexFillDirective"], _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCard"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLink"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZWJyaWVmaW5nLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _features_pages_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./features/pages/welcome/welcome.component */ "TtDS");
/* harmony import */ var _features_pages_tour_tour_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./features/pages/tour/tour.component */ "sv9q");
/* harmony import */ var _features_pages_debriefing_debriefing_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./features/pages/debriefing/debriefing.component */ "t/X2");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");






const routes = [
    { path: 'tour', component: _features_pages_tour_tour_component__WEBPACK_IMPORTED_MODULE_2__["TourComponent"] },
    { path: 'danke', component: _features_pages_debriefing_debriefing_component__WEBPACK_IMPORTED_MODULE_3__["DebriefingComponent"] },
    { path: '**', component: _features_pages_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_1__["WelcomeComponent"] }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map