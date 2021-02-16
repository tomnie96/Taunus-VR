import { TestBed } from '@angular/core/testing';

import { AframeService } from './aframe.service';

describe('AframeService', () => {
  let service: AframeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AframeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
