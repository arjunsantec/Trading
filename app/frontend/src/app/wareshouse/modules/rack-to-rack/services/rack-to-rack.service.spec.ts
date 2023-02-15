import { TestBed } from '@angular/core/testing';

import { RackToRackService } from './rack-to-rack.service';

describe('RackToRackService', () => {
  let service: RackToRackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RackToRackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
