import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUserMainPageComponent } from './company-user-main-page.component';

describe('CompanyUserMainPageComponent', () => {
  let component: CompanyUserMainPageComponent;
  let fixture: ComponentFixture<CompanyUserMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyUserMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUserMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
