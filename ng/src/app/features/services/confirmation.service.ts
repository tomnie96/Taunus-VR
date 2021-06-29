import { Injectable } from '@angular/core';
import {NavigationService} from './navigation.service';
import {MapService} from './map.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(
    private navigation: NavigationService,
  ) { }
  register(map: MapService, navigation: NavigationService): void {
    this.navigation = navigation;
    AFRAME.registerComponent('confirm', {

      init(): void {
        this.el.addEventListener('click', (e) => {

          // NgZone ensures correct DOM update
          navigation.setConfirmed();
          navigation.updateMainSphere(navigation.currentSphere, ['55', '03']);
        });
      },
    });
  }
  conf(): void {

  }
}
