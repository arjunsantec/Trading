import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryStudyMaterialComponent } from './delivery-study-material.component';

describe('DeliveryStudyMaterialComponent', () => {
  let component: DeliveryStudyMaterialComponent;
  let fixture: ComponentFixture<DeliveryStudyMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryStudyMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryStudyMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
