import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSettingsMainPageComponent } from './app-settings-main-page.component';

describe('AppSettingsMainPageComponent', () => {
  let component: AppSettingsMainPageComponent;
  let fixture: ComponentFixture<AppSettingsMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSettingsMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSettingsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
