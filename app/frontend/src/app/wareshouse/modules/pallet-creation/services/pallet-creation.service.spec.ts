import { TestBed } from '@angular/core/testing';

import { PalletCreationService } from './pallet-creation.service';

describe('PalletCreationService', () => {
  let service: PalletCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalletCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
