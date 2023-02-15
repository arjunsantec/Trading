import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletCreationComponent } from './pallet-creation.component';

describe('PalletCreationComponent', () => {
  let component: PalletCreationComponent;
  let fixture: ComponentFixture<PalletCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalletCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PalletCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
