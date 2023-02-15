import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlaygroundComponent } from './form-playground.component';

describe('FormPlaygroundComponent', () => {
  let component: FormPlaygroundComponent;
  let fixture: ComponentFixture<FormPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPlaygroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
