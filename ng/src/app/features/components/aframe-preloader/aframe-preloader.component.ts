import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-aframe-preloader',
  templateUrl: './aframe-preloader.component.html',
  styleUrls: ['./aframe-preloader.component.css']
})
export class AframePreloaderComponent implements OnInit {

  @Output() hasLoaded = new EventEmitter<boolean>();
  @Output() loadingProgress = new EventEmitter<number>();

  private minDownloads = 35;
  private currentDownloads = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  onLoad(): void {
    this.currentDownloads++;
    this.loadingProgress.emit((this.currentDownloads + 1) / (this.minDownloads + 1));
    if (this.currentDownloads === this.minDownloads) {
      this.hasLoaded.emit(true);
    }
  }

}
