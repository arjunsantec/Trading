import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptBuilderComponent } from './receipt-builder.component';

describe('ReceiptBuilderComponent', () => {
  let component: ReceiptBuilderComponent;
  let fixture: ComponentFixture<ReceiptBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
