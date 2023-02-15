import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageZoneCreationComponent } from './storage-zone-creation.component';

describe('StorageZoneCreationComponent', () => {
  let component: StorageZoneCreationComponent;
  let fixture: ComponentFixture<StorageZoneCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageZoneCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageZoneCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
