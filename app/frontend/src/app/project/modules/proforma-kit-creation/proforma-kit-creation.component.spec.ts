import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaKitCreationComponent } from './proforma-kit-creation.component';

describe('ProformaKitCreationComponent', () => {
  let component: ProformaKitCreationComponent;
  let fixture: ComponentFixture<ProformaKitCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProformaKitCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformaKitCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
