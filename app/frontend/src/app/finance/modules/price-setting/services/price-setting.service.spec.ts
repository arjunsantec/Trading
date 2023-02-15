import { TestBed } from '@angular/core/testing';

import { PriceSettingService } from './price-setting.service';

describe('PriceSettingService', () => {
  let service: PriceSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
