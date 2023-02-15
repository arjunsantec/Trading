import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistructStudyMaterialComponent } from './distruct-study-material.component';

describe('DistructStudyMaterialComponent', () => {
  let component: DistructStudyMaterialComponent;
  let fixture: ComponentFixture<DistructStudyMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistructStudyMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistructStudyMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
