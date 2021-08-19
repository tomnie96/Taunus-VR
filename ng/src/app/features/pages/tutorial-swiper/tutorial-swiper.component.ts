import { ChangeDetectorRef, Component, ViewChild, OnInit } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
} from 'swiper/core';
import {ActivatedRoute, Router} from '@angular/router';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

@Component({
  selector: 'app-tutorial-swiper',
  templateUrl: 'tutorial-swiper.component.html',
  styleUrls: ['./tutorial-swiper.component.css']
})
export class TutorialSwiperComponent implements OnInit{
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;

  show: boolean;
  thumbs: any;

  thumbsSwiper: any;

  slides2 = ['slide 1', 'slide 2', 'slide 3'];

  navigation = false;

  scrollbar: any = false;
  breakpoints = {
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 4, spaceBetween: 40 },
    1024: { slidesPerView: 4, spaceBetween: 50 }
  };

  slides = Array.from({ length: 5 }).map((el, index) => `Slide ${index + 1}`);
  virtualSlides = Array.from({ length: 600 }).map(
    (el, index) => `Slide ${index + 1}`
  );

  breakPointsToggle: boolean;
  vrDevice: boolean;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.vrDevice = this.route.snapshot.paramMap.get('device') === 'vr';
    console.log(this.vrDevice);
  }

  replaceSlides(): void {
    this.slides2 = ['foo', 'bar'];
  }


  breakpointChange(): void {
    this.breakPointsToggle = !this.breakPointsToggle;
    this.breakpoints = {
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 40 },
      1024: { slidesPerView: this.breakPointsToggle ? 7 : 5, spaceBetween: 50 }
    };
  }

}
