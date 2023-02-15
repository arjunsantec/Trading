import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySiteToPatientPrintComponent } from './delivery-site-to-patient-print.component';

describe('DeliverySiteToPatientPrintComponent', () => {
  let component: DeliverySiteToPatientPrintComponent;
  let fixture: ComponentFixture<DeliverySiteToPatientPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverySiteToPatientPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverySiteToPatientPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
