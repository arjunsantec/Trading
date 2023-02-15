import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackToRackComponent } from './rack-to-rack.component';

describe('RackToRackComponent', () => {
  let component: RackToRackComponent;
  let fixture: ComponentFixture<RackToRackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RackToRackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RackToRackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
