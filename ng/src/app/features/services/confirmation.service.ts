import { Injectable } from '@angular/core';
import {NavigationService} from './navigation.service';
import {MapService} from './map.service';


@Injectable({
  providedIn: 'root'
})



export class ConfirmationService {

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
  register(navigation: NavigationService): void {
    this.navigation = navigation;
    AFRAME.registerComponent('confirm', {
      init(): void {
        this.el.addEventListener('mouseenter', (e) => {
          navigation.updateMainSphere(navigation.currentSphere, [57]);
          ConfirmationService.fade(document.getElementById('entry-point'));
        });
      },
    });
  }
}
