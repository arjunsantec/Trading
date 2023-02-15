import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageTypeCreationComponent } from './storage-type-creation.component';

describe('StorageTypeCreationComponent', () => {
  let component: StorageTypeCreationComponent;
  let fixture: ComponentFixture<StorageTypeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageTypeCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageTypeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
