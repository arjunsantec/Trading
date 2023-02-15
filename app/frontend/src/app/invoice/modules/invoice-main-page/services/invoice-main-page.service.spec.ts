import { TestBed } from '@angular/core/testing';

import { InvoiceMainPageService } from './invoice-main-page.service';

describe('InvoiceMainPageService', () => {
  let service: InvoiceMainPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceMainPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
