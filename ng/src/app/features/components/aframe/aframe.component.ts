import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {NavigationService} from '../../services/navigation.service';
import {CalcService} from '../../services/calc.service';
import {MapService} from '../../services/map.service';
import {SnowService} from '../../services/snow.service';

@Component({
  selector: 'app-aframe',
  templateUrl: './aframe.component.html',
  styleUrls: ['./aframe.component.css']
})
export class AframeComponent implements OnInit {

  constructor(
    private nav: NavigationService,
    private menu: MenuService,
    private calc: CalcService,
    private map: MapService,
    private snow: SnowService) {
  }

  ngOnInit(): void {
    this.menu.register(this.map);
    this.nav.register(this.map, this.menu);
    this.map.register();
    this.snow.register();
    this.calc.registerLookAt();
  }

}
