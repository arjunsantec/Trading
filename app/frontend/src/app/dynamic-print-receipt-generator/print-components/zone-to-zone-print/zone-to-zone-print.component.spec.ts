import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneToZonePrintComponent } from './zone-to-zone-print.component';

describe('ZoneToZonePrintComponent', () => {
  let component: ZoneToZonePrintComponent;
  let fixture: ComponentFixture<ZoneToZonePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneToZonePrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneToZonePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
