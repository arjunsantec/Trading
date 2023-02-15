import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyMateriaslReturnComponent } from './study-materiasl-return.component';

describe('StudyMateriaslReturnComponent', () => {
  let component: StudyMateriaslReturnComponent;
  let fixture: ComponentFixture<StudyMateriaslReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyMateriaslReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyMateriaslReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
