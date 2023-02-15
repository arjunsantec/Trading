import { TestBed } from '@angular/core/testing';

import { GrnDetailsService } from './grn-details.service';

describe('GrnDetailsService', () => {
  let service: GrnDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrnDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
