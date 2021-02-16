import {Component, OnDestroy} from '@angular/core';
import {AnalyticsService} from './features/services/analytics.service';
import {EventType} from './features/models/event-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'KD2 Lab 360° Tour';

  constructor(private analytics: AnalyticsService) {
  }

  ngOnDestroy(): void {
    this.analytics.trackEvent(EventType.ExitWebsite, '');
  }

}
