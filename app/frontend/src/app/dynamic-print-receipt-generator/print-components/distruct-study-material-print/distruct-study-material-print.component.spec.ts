import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistructStudyMaterialPrintComponent } from './distruct-study-material-print.component';

describe('DistructStudyMaterialPrintComponent', () => {
  let component: DistructStudyMaterialPrintComponent;
  let fixture: ComponentFixture<DistructStudyMaterialPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistructStudyMaterialPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistructStudyMaterialPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
