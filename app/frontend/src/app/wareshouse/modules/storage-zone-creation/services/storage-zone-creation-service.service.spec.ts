import { TestBed } from '@angular/core/testing';

import { StorageZoneCreationServiceService } from './storage-zone-creation-service.service';

describe('StorageZoneCreationServiceService', () => {
  let service: StorageZoneCreationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageZoneCreationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
