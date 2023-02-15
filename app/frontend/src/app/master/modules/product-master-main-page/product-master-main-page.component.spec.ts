import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMasterMainPageComponent } from './product-master-main-page.component';

describe('ProductMasterMainPageComponent', () => {
  let component: ProductMasterMainPageComponent;
  let fixture: ComponentFixture<ProductMasterMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMasterMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMasterMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
