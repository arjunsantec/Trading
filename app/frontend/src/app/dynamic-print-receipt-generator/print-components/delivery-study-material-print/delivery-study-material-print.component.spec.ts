import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryStudyMaterialPrintComponent } from './delivery-study-material-print.component';

describe('DeliveryStudyMaterialPrintComponent', () => {
  let component: DeliveryStudyMaterialPrintComponent;
  let fixture: ComponentFixture<DeliveryStudyMaterialPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryStudyMaterialPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryStudyMaterialPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
