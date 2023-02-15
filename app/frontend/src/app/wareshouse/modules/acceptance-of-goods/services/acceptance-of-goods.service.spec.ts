import { TestBed } from '@angular/core/testing';

import { AcceptanceOfGoodsService } from './acceptance-of-goods.service';

describe('AcceptanceOfGoodsService', () => {
  let service: AcceptanceOfGoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptanceOfGoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
