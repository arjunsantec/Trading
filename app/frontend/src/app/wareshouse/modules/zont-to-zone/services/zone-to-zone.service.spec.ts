import { TestBed } from '@angular/core/testing';

import { ZoneToZoneService } from './zone-to-zone.service';

describe('ZoneToZoneService', () => {
  let service: ZoneToZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoneToZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
