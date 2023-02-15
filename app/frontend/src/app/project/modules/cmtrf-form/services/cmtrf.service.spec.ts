import { TestBed } from '@angular/core/testing';

import { CmtrfService } from './cmtrf.service';

describe('CmtrfService', () => {
  let service: CmtrfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmtrfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
