import { TestBed } from '@angular/core/testing';

import { ReturnStudyMaterialService } from './return-study-material.service';

describe('ReturnStudyMaterialService', () => {
  let service: ReturnStudyMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnStudyMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
