import { TestBed } from '@angular/core/testing';

import { SiteToSiteService } from './site-to-site.service';

describe('SiteToSiteService', () => {
  let service: SiteToSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteToSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
