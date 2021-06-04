import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AframeForestComponent } from './aframe-forest.component';

describe('AframeForestComponent', () => {
  let component: AframeForestComponent;
  let fixture: ComponentFixture<AframeForestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AframeForestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AframeForestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
