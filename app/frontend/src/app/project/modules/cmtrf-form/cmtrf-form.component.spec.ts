import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmtrfFormComponent } from './cmtrf-form.component';

describe('CmtrfFormComponent', () => {
  let component: CmtrfFormComponent;
  let fixture: ComponentFixture<CmtrfFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmtrfFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmtrfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
