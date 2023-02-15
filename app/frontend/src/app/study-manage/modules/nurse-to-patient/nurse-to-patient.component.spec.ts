import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseToPatientComponent } from './nurse-to-patient.component';

describe('NurseToPatientComponent', () => {
  let component: NurseToPatientComponent;
  let fixture: ComponentFixture<NurseToPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseToPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseToPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
