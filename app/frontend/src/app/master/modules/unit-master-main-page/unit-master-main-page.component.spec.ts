import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitMasterMainPageComponent } from './unit-master-main-page.component';

describe('UnitMasterMainPageComponent', () => {
  let component: UnitMasterMainPageComponent;
  let fixture: ComponentFixture<UnitMasterMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitMasterMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitMasterMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
