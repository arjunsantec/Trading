import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteToSitePrintComponent } from './site-to-site-print.component';

describe('SiteToSitePrintComponent', () => {
  let component: SiteToSitePrintComponent;
  let fixture: ComponentFixture<SiteToSitePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteToSitePrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteToSitePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
