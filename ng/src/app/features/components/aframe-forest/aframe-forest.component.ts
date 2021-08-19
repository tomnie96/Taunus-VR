import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {MenuService} from '../../services/menu.service';
import {CalcService} from '../../services/calc.service';
import {MapService} from '../../services/map.service';
import {MediaService} from '../../services/media.service';
import {SnowService} from '../../services/snow.service';
import {AnalyticsService} from '../../services/analytics.service';
import {environment} from '../../../../environments/environment';
import {ConfirmationService} from '../../services/confirmation.service';

@Component({
  selector: 'app-aframe-forest',
  templateUrl: './aframe-forest.component.html',
  styleUrls: ['./aframe-forest.component.css']
})
export class AframeForestComponent implements OnInit {
  public text: any;

  constructor(
    private nav: NavigationService,
    private menu: MenuService,
    private calc: CalcService,
    private map: MapService,
    private media: MediaService,
    private snow: SnowService,
    private analytics: AnalyticsService,
    private confirmation: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.analytics.register();
    this.menu.register(this.map);
    this.nav.register(this.map, this.menu);
    this.map.register();
    this.media.register();
    this.snow.register();
    this.calc.registerLookAt();
    this.confirmation.register(this.nav);

    // Aframe stats
    if (!environment.production) {
      document.querySelector('a-scene').setAttribute('stats', '');
    }
  }
}
