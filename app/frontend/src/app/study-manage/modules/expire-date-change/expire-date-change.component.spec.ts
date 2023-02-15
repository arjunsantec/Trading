import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpireDateChangeComponent } from './expire-date-change.component';

describe('ExpireDateChangeComponent', () => {
  let component: ExpireDateChangeComponent;
  let fixture: ComponentFixture<ExpireDateChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpireDateChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpireDateChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
