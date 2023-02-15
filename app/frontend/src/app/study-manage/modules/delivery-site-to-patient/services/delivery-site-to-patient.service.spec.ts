import { TestBed } from '@angular/core/testing';

import { DeliverySiteToPatientService } from './delivery-site-to-patient.service';

describe('DeliverySiteToPatientService', () => {
  let service: DeliverySiteToPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverySiteToPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
