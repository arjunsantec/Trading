import { TestBed } from '@angular/core/testing';

import { DistructStudyMaterialService } from './distruct-study-material.service';

describe('DistructStudyMaterialService', () => {
  let service: DistructStudyMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistructStudyMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
