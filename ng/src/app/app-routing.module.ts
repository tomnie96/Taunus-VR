import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WelcomeComponent} from './features/pages/welcome/welcome.component';
import {DebriefingComponent} from './features/pages/debriefing/debriefing.component';
import {AframeForestComponent} from './features/components/aframe-forest/aframe-forest.component';
import {TutorialComponent} from './features/pages/tutorial/tutorial.component';
import {StartComponent} from './features/pages/start/start.component';

const routes: Routes = [
  { path: 'tour', component: AframeForestComponent},
  { path: 'danke', component: DebriefingComponent},
  { path: ':device/tutorial', component: TutorialComponent},
  { path: 'desktop', component: WelcomeComponent},
  { path: 'vr', component: WelcomeComponent},
  { path: '**', component: StartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
