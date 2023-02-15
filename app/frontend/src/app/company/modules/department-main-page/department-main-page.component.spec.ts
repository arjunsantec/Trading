import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentMainPageComponent } from './department-main-page.component';

describe('DepartmentMainPageComponent', () => {
  let component: DepartmentMainPageComponent;
  let fixture: ComponentFixture<DepartmentMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
