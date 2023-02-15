import { TestBed } from '@angular/core/testing';

import { WareshouseCreationService } from './wareshouse-creation.service';

describe('WareshouseCreationService', () => {
  let service: WareshouseCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WareshouseCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
