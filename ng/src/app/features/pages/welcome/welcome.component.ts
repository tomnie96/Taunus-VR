import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  preload = false;
  loaded = false;
  progress = 0;

  constructor() { }

  ngOnInit(): void {
  }

  hasLoaded(loaded: boolean): void {
    if (loaded) {
      setTimeout(() => this.loaded = true, 1000);
    }
  }

  loadingProgress(progress: number): void {
    this.progress = progress;
  }
}
