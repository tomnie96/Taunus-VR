import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WelcomeComponent} from './features/pages/welcome/welcome.component';
import {TourComponent} from './features/pages/tour/tour.component';
import {DebriefingComponent} from './features/pages/debriefing/debriefing.component';
import {AframeForestComponent} from './features/components/aframe-forest/aframe-forest.component';

const routes: Routes = [
  { path: 'tour', component: AframeForestComponent},
  { path: 'danke', component: DebriefingComponent},
  { path: '**', component: WelcomeComponent},
  { path: 'forest', component: AframeForestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
