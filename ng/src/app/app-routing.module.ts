import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WelcomeComponent} from './features/pages/welcome/welcome.component';
import {TourComponent} from './features/pages/tour/tour.component';
import {DebriefingComponent} from './features/pages/debriefing/debriefing.component';
import {AframeForestComponent} from './features/components/aframe-forest/aframe-forest.component';
import {QuizComponent} from './features/pages/quiz/quiz.component';
import {SurveyComponent} from './features/pages/quiz/survey.component';
import {TutorialComponent} from './features/pages/tutorial/tutorial.component';

const routes: Routes = [
  { path: 'tour', component: AframeForestComponent},
  { path: 'danke', component: DebriefingComponent},
  { path: 'quiz', component: SurveyComponent},
  { path: 'forest', component: AframeForestComponent},
  { path: 'tutorial', component: TutorialComponent},
  { path: '**', component: WelcomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
