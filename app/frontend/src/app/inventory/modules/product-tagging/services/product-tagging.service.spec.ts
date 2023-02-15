import { TestBed } from '@angular/core/testing';

import { ProductTaggingService } from './product-tagging.service';

describe('ProductTaggingService', () => {
  let service: ProductTaggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductTaggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
