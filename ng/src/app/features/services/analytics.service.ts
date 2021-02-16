import {Injectable} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {EventType} from '../models/event-type.enum';
// @ts-ignore
import {version} from '../../../../package.json';
import {Session} from '../models/session';
import {AnalyticsEvent} from '../models/analytics-event';
import {Event, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Device} from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private isRegistered = false;

  constructor(private router: Router) {
    this.session = new Session(uuid(), version, AnalyticsService.getDeviceInfo(), new Date());
    this.trackEvent(EventType.EnterWebsite, '/');

    // TODO: Implement API
    console.log(this.session);

    // Subscribe to Router navigation
    router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      // Avoid duplicate calls for one navigation
      if (e.id !== this.navigationId) {
        this.navigationId = e.id;
        this.trackEvent(EventType.Navigate, e.url);
      }
    });
  }

  session: Session;
  isInVR: boolean;

  private navigationId = 0;

  private static getDeviceInfo(): Device {
    let connectionSpeed = null;
    let connectionType = null;

    try {
      // @ts-ignore
      connectionSpeed = navigator.connection.downlink;
    } catch (e) {}
    try {
      // @ts-ignore
      connectionType = navigator.connection.type;
    } catch (e) {}

    return new Device(
      navigator.userAgent,
      connectionSpeed,
      connectionType,
      window.screen.availWidth,
      window.screen.availHeight
    );
  }

  // TODO: Implement API
  trackEvent(eventType: EventType, target: string): void {
    console.log(new AnalyticsEvent(this.session.sessionId, eventType, target, this.getRuntime()));
  }

  register(): void {

    const context = this;

    if (!this.isRegistered) {
      this.isRegistered = true;

      // Track Enter/Exit VR
      document.querySelector('a-scene').addEventListener('enter-vr', () => this.trackEvent(EventType.EnterVR, ''));
      document.querySelector('a-scene').addEventListener('exit-vr', () => this.trackEvent(EventType.ExitVR, ''));

      // Analytics Component
      AFRAME.registerComponent('analytics', {
        schema: {type: 'string'},

        init(): void {
          this.el.addEventListener('mouseenter', () => context.trackEvent(EventType.StartPOI, this.data));
          this.el.addEventListener('mouseleave', () => context.trackEvent(EventType.StopPOI, this.data));
        }

      });
    }

  }

  private getRuntime(): number {
    return new Date().getTime() - this.session.datetime.getTime();
  }

}
