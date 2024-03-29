import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBodyComponent } from './footer-body.component';

describe('FooterBodyComponent', () => {
  let component: FooterBodyComponent;
  let fixture: ComponentFixture<FooterBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
