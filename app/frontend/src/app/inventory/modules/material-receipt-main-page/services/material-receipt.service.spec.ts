import { TestBed } from '@angular/core/testing';

import { MaterialReceiptService } from './material-receipt.service';

describe('MaterialReceiptService', () => {
  let service: MaterialReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
