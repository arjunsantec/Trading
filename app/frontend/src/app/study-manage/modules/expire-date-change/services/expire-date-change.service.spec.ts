import { TestBed } from '@angular/core/testing';

import { ExpireDateChangeService } from './expire-date-change.service';

describe('ExpireDateChangeService', () => {
  let service: ExpireDateChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpireDateChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
