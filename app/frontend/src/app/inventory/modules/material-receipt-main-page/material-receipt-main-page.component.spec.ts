import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReceiptMainPageComponent } from './material-receipt-main-page.component';

describe('MaterialReceiptMainPageComponent', () => {
  let component: MaterialReceiptMainPageComponent;
  let fixture: ComponentFixture<MaterialReceiptMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialReceiptMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialReceiptMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
