import {Injectable} from '@angular/core';
import {AnalyticsService} from './analytics.service';
import {EventType} from '../models/event-type.enum';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private isRegistered = false;

  constructor(
    private analytics: AnalyticsService
  ) {
  }

  register(): void {
    if (!this.isRegistered) {
      this.isRegistered = true;
      const context = this;

      AFRAME.registerComponent('poster', {
        schema: {
          useIcon: {type: 'boolean'},
          moveIcon: {type: 'vec3'}
        },

        init(): void {

          const self = this;
          this.el.setAttribute('opacity', '0');
          this.defaultHeight = this.el.getAttribute('height');
          this.defaultWidth = this.el.getAttribute('width');

          const poster = this.el.children[0];
          let icon;
          if (this.data.useIcon) {
            // Initialize icon
            icon = document.createElement('a-image');
            icon.setAttribute('src', '#icon-info');
            icon.setAttribute('opacity', '.7');
            icon.setAttribute('position', '0 0 .01');
            icon.setAttribute('height', '.25');
            icon.setAttribute('width', '.25');
            this.el.appendChild(icon);

            // Set poster invisible
            poster.setAttribute('scale', '.0001 .0001 .0001');
            this.el.setAttribute('opacity', '.5');
            this.el.setAttribute('color', '#666666');
          }

          this.el.addEventListener('mouseenter', () => {
            if (self.data.useIcon) {
              poster.setAttribute('scale', '1 1 1');
              const coord = self.data.moveIcon;
              coord.z = .01;
              icon.setAttribute('position', coord);
              self.el.setAttribute('opacity', '0');
              self.el.setAttribute('height', poster.getAttribute('height'));
              self.el.setAttribute('width', poster.getAttribute('width'));
            }
          });

          this.el.addEventListener('mouseleave', () => {
            if (self.data.useIcon) {
              self.el.setAttribute('height', self.defaultHeight);
              self.el.setAttribute('width', self.defaultWidth);
              poster.setAttribute('scale', '.0001 .0001 .0001');
              icon.setAttribute('position', '0 0 .01');
              self.el.setAttribute('opacity', '.5');
            }
          });


        }
      });

      AFRAME.registerComponent('audio', {
        schema: {
          name: {type: 'string'},
          text: {type: 'string'}
        },

        init(): void {
          const self = this;

          const sound = this.el.children[0];
          self.isPlayingAudio = false;
          self.lastClick = new Date();

          const plane = document.createElement('a-plane');
          plane.setAttribute('opacity', '.5');
          plane.setAttribute('height', '.5');
          plane.setAttribute('width', '.5');
          plane.setAttribute('shader', 'flat');
          plane.setAttribute('color', '#666');
          plane.setAttribute('class', 'link');

          const img = document.createElement('a-image');
          img.setAttribute('src', '#icon-audio-off');
          img.setAttribute('height', .2);
          img.setAttribute('width', .15);
          img.setAttribute('position', '0 .03 .001');
          img.setAttribute('animation__pulse', 'property: scale; startEvents: startPulse, animationcomplete__pulseback; pauseEvents: stopPulse; to: .85 .85 .85; dur: 1500; easing: easeOutSine');
          img.setAttribute('animation__pulseback', 'property: scale; startEvents: animationcomplete__pulse; to: 1 1 1; dur: 1500; easing: easeInSine');
          img.setAttribute('animation__pulsestop', 'property: scale; startEvents: stopPulse; to: 1 1 1; dur: 100; easing: easeOutCubic');

          const text = document.createElement('a-text');
          text.setAttribute('value', this.data.text);
          text.setAttribute('align', 'center');
          text.setAttribute('height', 1);
          text.setAttribute('width', 1.5);
          text.setAttribute('color', '#111');
          text.setAttribute('position', '0 -.15 .001');

          this.el.appendChild(plane);
          this.el.appendChild(img);
          this.el.appendChild(text);

          this.sound = sound;
          this.img = img;

          this.el.addEventListener('click', () => {
            // Avoid double clicks through fusing & clicking
            if (self.lastClick.getTime() + 1300 > new Date().getTime()) {
              return;
            }
            self.lastClick = new Date();

            if (!self.isPlayingAudio) {
              self.isPlayingAudio = true;
              this.startPlaying();

            } else if (self.isPlayingAudio) {
              self.isPlayingAudio = false;
              this.stopPlaying();
            }
          });

          sound.addEventListener('sound-ended', () => {
            self.isPlayingAudio = false;
            this.stopPlaying();
          });

          sound.addEventListener('stopPlaying', () => {
            if (self.isPlayingAudio) {
              self.isPlayingAudio = false;
              this.stopPlaying();
            }
          });
        },

        remove(): void {
          // @ts-ignore
          self.isPlayingAudio = false;
          this.stopPlaying();
        },

        startPlaying(): void {
          // Set icon
          this.img.setAttribute('src', '#icon-audio-on');
          this.img.setAttribute('width', .25);
          this.img.dispatchEvent(new CustomEvent('startPulse'));

          // Play
          // @ts-ignore
          this.sound.components.sound.playSound();

          context.analytics.trackEvent(EventType.StartPOI, this.data.name);
        },

        stopPlaying(): void {
          // Set icon
          this.img.setAttribute('src', '#icon-audio-off');
          this.img.setAttribute('width', .15);
          this.img.dispatchEvent(new CustomEvent('stopPulse'));

          // Stop
          // @ts-ignore
          this.sound.components.sound.stopSound();

          context.analytics.trackEvent(EventType.StopPOI, this.data.name);
        }
      });
    }
  }

}
