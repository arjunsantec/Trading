import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySiteToPatientComponent } from './delivery-site-to-patient.component';

describe('DeliverySiteToPatientComponent', () => {
  let component: DeliverySiteToPatientComponent;
  let fixture: ComponentFixture<DeliverySiteToPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverySiteToPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverySiteToPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
