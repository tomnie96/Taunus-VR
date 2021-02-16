import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebriefingComponent } from './debriefing.component';

describe('DebriefingComponent', () => {
  let component: DebriefingComponent;
  let fixture: ComponentFixture<DebriefingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebriefingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebriefingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
