import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryMainPageComponent } from './product-category-main-page.component';

describe('ProductCategoryMainPageComponent', () => {
  let component: ProductCategoryMainPageComponent;
  let fixture: ComponentFixture<ProductCategoryMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
