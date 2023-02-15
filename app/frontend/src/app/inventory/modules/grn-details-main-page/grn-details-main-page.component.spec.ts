import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnDetailsMainPageComponent } from './grn-details-main-page.component';

describe('GrnDetailsMainPageComponent', () => {
  let component: GrnDetailsMainPageComponent;
  let fixture: ComponentFixture<GrnDetailsMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnDetailsMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnDetailsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
