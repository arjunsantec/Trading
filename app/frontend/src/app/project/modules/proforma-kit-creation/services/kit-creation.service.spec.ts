import { TestBed } from '@angular/core/testing';

import { KitCreationService } from './kit-creation.service';

describe('KitCreationService', () => {
  let service: KitCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
