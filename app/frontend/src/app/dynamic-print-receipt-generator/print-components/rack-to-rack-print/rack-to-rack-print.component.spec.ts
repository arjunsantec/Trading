import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackToRackPrintComponent } from './rack-to-rack-print.component';

describe('RackToRackPrintComponent', () => {
  let component: RackToRackPrintComponent;
  let fixture: ComponentFixture<RackToRackPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RackToRackPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RackToRackPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
