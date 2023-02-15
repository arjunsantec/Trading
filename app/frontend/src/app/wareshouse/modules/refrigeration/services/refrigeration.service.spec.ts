import { TestBed } from '@angular/core/testing';

import { RefrigerationService } from './refrigeration.service';

describe('RefrigerationService', () => {
  let service: RefrigerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefrigerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
