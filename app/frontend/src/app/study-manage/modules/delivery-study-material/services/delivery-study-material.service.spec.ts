import { TestBed } from '@angular/core/testing';

import { DeliveryStudyMaterialService } from './delivery-study-material.service';

describe('DeliveryStudyMaterialService', () => {
  let service: DeliveryStudyMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryStudyMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
