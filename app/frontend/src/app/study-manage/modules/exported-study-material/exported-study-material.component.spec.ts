import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportedStudyMaterialComponent } from './exported-study-material.component';

describe('ExportedStudyMaterialComponent', () => {
  let component: ExportedStudyMaterialComponent;
  let fixture: ComponentFixture<ExportedStudyMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportedStudyMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportedStudyMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
