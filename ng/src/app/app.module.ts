import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LayoutModule} from '@angular/cdk/layout';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {WelcomeComponent} from './features/pages/welcome/welcome.component';
import {TourComponent} from './features/pages/tour/tour.component';
import {DebriefingComponent} from './features/pages/debriefing/debriefing.component';
import {AppRoutingModule} from './app-routing.module';
import {AframeComponent} from './features/components/aframe/aframe.component';
import {AframePreloaderComponent} from './features/components/aframe-preloader/aframe-preloader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AframeForestComponent } from './features/components/aframe-forest/aframe-forest.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TourComponent,
    DebriefingComponent,
    AframeComponent,
    AframePreloaderComponent,
    AframeForestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    FlexLayoutModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
