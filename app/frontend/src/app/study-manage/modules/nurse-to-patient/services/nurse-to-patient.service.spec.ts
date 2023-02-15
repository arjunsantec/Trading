import { TestBed } from '@angular/core/testing';

import { NurseToPatientService } from './nurse-to-patient.service';

describe('NurseToPatientService', () => {
  let service: NurseToPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NurseToPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
