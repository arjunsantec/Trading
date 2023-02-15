import { TestBed } from '@angular/core/testing';

import { ShelfCreationService } from './shelf-creation.service';

describe('ShelfCreationService', () => {
  let service: ShelfCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShelfCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
