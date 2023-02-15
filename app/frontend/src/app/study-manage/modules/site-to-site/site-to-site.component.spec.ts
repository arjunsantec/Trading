import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteToSiteComponent } from './site-to-site.component';

describe('SiteToSiteComponent', () => {
  let component: SiteToSiteComponent;
  let fixture: ComponentFixture<SiteToSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteToSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteToSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
