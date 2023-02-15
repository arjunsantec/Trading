import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpireDateChangePrintComponent } from './expire-date-change-print.component';

describe('ExpireDateChangePrintComponent', () => {
  let component: ExpireDateChangePrintComponent;
  let fixture: ComponentFixture<ExpireDateChangePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpireDateChangePrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpireDateChangePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
