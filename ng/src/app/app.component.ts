import {Component, OnDestroy} from '@angular/core';
import {AnalyticsService} from './features/services/analytics.service';
import {EventType} from './features/models/event-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = '360° Waldtour';

  constructor(private analytics: AnalyticsService) {
    console.log('KD2 360 Tour Version: ' + analytics.session.appVersion);
  }

  ngOnDestroy(): void {
    this.analytics.trackEvent(EventType.ExitWebsite, '');
  }

}
