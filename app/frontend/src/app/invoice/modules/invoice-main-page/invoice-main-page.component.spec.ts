import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMainPageComponent } from './invoice-main-page.component';

describe('InvoiceMainPageComponent', () => {
  let component: InvoiceMainPageComponent;
  let fixture: ComponentFixture<InvoiceMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
