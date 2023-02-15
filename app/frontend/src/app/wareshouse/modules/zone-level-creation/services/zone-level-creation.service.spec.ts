import { TestBed } from '@angular/core/testing';

import { ZoneLevelCreationService } from './zone-level-creation.service';

describe('ZoneLevelCreationService', () => {
  let service: ZoneLevelCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoneLevelCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
