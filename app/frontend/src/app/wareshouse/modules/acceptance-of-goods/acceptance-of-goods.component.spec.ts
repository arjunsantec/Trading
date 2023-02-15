import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceOfGoodsComponent } from './acceptance-of-goods.component';

describe('AcceptanceOfGoodsComponent', () => {
  let component: AcceptanceOfGoodsComponent;
  let fixture: ComponentFixture<AcceptanceOfGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptanceOfGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceOfGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
