import { TestBed } from '@angular/core/testing';

import { PartyMasterService } from './party-master.service';

describe('PartyMasterService', () => {
  let service: PartyMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
