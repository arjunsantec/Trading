import { TestBed } from '@angular/core/testing';

import { ExportedStudyMaterialService } from './exported-study-material.service';

describe('ExportedStudyMaterialService', () => {
  let service: ExportedStudyMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportedStudyMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
