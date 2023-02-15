import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnStudyMaterialComponent } from './return-study-material.component';

describe('ReturnStudyMaterialComponent', () => {
  let component: ReturnStudyMaterialComponent;
  let fixture: ComponentFixture<ReturnStudyMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnStudyMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnStudyMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
