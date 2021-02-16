import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WelcomeComponent} from './features/pages/welcome/welcome.component';
import {TourComponent} from './features/pages/tour/tour.component';
import {DebriefingComponent} from './features/pages/debriefing/debriefing.component';

const routes: Routes = [
  { path: 'tour', component: TourComponent},
  { path: 'danke', component: DebriefingComponent},
  { path: '**', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
