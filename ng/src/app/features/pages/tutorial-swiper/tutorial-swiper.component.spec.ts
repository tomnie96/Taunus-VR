import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialSwiperComponent } from './tutorial-swiper.component';

describe('TutorialSwiperComponent', () => {
  let component: TutorialSwiperComponent;
  let fixture: ComponentFixture<TutorialSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialSwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
