import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptFieldBuilderComponent } from './receipt-field-builder.component';

describe('ReceiptFieldBuilderComponent', () => {
  let component: ReceiptFieldBuilderComponent;
  let fixture: ComponentFixture<ReceiptFieldBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptFieldBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptFieldBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
