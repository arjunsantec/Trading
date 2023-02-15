import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptOfGoodsComponent } from './receipt-of-goods.component';

describe('ReceiptOfGoodsComponent', () => {
  let component: ReceiptOfGoodsComponent;
  let fixture: ComponentFixture<ReceiptOfGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptOfGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptOfGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
