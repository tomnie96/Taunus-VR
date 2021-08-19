import { Injectable } from '@angular/core';
import {NavigationService} from './navigation.service';
import {MapService} from './map.service';

class CheckPoint {
  id: string;
  unlockPoint: string;
  unlocked: boolean;

  constructor(id: string, unlockPoint: string, unlocked: boolean) {
    this.id = id;
    this.unlockPoint = unlockPoint;
    this.unlocked = unlocked;
  }
}

@Injectable({
  providedIn: 'root'
})



export class ConfirmationService {
  static checkPoint: CheckPoint;
  static unlockPoint = 'sky-57';
  static fade(element: any): void {
    let op = 1;  // initial opacity
    const timer = setInterval( () => {
      if (op <= 0.1){
        clearInterval(timer);
        element.setAttribute('visible', false);
      }
      element.setAttribute('opacity', op);
      op -= op * 0.1;
    }, 50);
  }

  constructor(
    private navigation: NavigationService,
  ) { }
  register(map: MapService, navigation: NavigationService): void {
    this.navigation = navigation;
    ConfirmationService.checkPoint = new CheckPoint('sky-55', 'sky-57', false);
    AFRAME.registerComponent('confirm', {

      init(): void {
        this.el.addEventListener('mouseenter', (e) => {
          navigation.setConfirmed();
          navigation.updateMainSphere(navigation.currentSphere, [57]);
          ConfirmationService.fade(document.getElementById('entry-point'));
        });
      },
    });
  }
}
