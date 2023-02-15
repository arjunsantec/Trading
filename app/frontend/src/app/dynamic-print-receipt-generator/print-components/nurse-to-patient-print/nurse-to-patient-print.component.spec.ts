import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseToPatientPrintComponent } from './nurse-to-patient-print.component';

describe('NurseToPatientPrintComponent', () => {
  let component: NurseToPatientPrintComponent;
  let fixture: ComponentFixture<NurseToPatientPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseToPatientPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseToPatientPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
