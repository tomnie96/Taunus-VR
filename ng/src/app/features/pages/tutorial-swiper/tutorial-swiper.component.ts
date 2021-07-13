import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
  selector: 'app-swiper-example',
  styles: [
    `
      .bg-yellow {
        background-color: yellow;
      }
      .transition {
        transition: background 0.25s ease, color 0.25s ease;
      }
      .active-slide {
        background-color: green;
        color: #fff;
      }
      .bg-blue {
        background-color: blue;
        color: #fff;
      }
    `
  ],
  templateUrl: 'tutorial-swiper.component.html',
  styleUrls: ['./tutorial-swiper.component.css']
})
export class TutorialSwiperComponent {
  constructor(private cd: ChangeDetectorRef) {}
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;

  show: boolean;
  thumbs: any;

  thumbsSwiper: any;
  controlledSwiper: any;

  indexNumber = 1;
  exampleConfig = { slidesPerView: 3 };
  slidesPerView = 4;
  pagination: any = false;

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
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {}
  // tslint:disable-next-line:typedef
  setThumbsSwiper(swiper) {
    this.thumbsSwiper = swiper;
  }
  // tslint:disable-next-line:typedef
  setControlledSwiper(swiper) {
    this.controlledSwiper = swiper;
  }
  // tslint:disable-next-line:typedef
  replaceSlides() {
    this.slides2 = ['foo', 'bar'];
  }

  // tslint:disable-next-line:typedef
  togglePagination() {
    if (!this.pagination) {
      this.pagination = { type: 'fraction' };
    } else {
      this.pagination = false;
    }
  }
  // tslint:disable-next-line:typedef
  toggleNavigation() {
    this.navigation = !this.navigation;
  }
  // tslint:disable-next-line:typedef
  toggleScrollbar() {
    if (!this.scrollbar) {
      this.scrollbar = { draggable: true };
    } else {
      this.scrollbar = false;
    }
  }

  // tslint:disable-next-line:typedef variable-name
  log(string) {
    // console.log(string);
  }
  // tslint:disable-next-line:typedef
  breakpointChange() {
    this.breakPointsToggle = !this.breakPointsToggle;
    this.breakpoints = {
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 40 },
      1024: { slidesPerView: this.breakPointsToggle ? 7 : 5, spaceBetween: 50 }
    };
  }
}
