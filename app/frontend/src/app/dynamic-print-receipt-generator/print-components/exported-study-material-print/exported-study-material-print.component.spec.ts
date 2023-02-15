import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportedStudyMaterialPrintComponent } from './exported-study-material-print.component';

describe('ExportedStudyMaterialPrintComponent', () => {
  let component: ExportedStudyMaterialPrintComponent;
  let fixture: ComponentFixture<ExportedStudyMaterialPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportedStudyMaterialPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportedStudyMaterialPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
