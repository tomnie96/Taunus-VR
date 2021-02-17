import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AframePreloaderComponent } from './aframe-preloader.component';

describe('AframePreloaderComponent', () => {
  let component: AframePreloaderComponent;
  let fixture: ComponentFixture<AframePreloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AframePreloaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AframePreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
