import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubcategoryMainPageComponent } from './product-subcategory-main-page.component';

describe('ProductSubcategoryMainPageComponent', () => {
  let component: ProductSubcategoryMainPageComponent;
  let fixture: ComponentFixture<ProductSubcategoryMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSubcategoryMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubcategoryMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
