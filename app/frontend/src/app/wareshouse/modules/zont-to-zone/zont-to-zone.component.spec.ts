import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZontToZoneComponent } from './zont-to-zone.component';

describe('ZontToZoneComponent', () => {
  let component: ZontToZoneComponent;
  let fixture: ComponentFixture<ZontToZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZontToZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZontToZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
