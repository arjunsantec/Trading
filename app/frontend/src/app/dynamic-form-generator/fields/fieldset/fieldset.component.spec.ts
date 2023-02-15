import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSetComponent } from './fieldset.component';

describe('CardComponent', () => {
  let component: FieldSetComponent;
  let fixture: ComponentFixture<FieldSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
