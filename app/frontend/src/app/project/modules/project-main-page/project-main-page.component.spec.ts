import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMainPageComponent } from './project-main-page.component';

describe('ProjectMainPageComponent', () => {
  let component: ProjectMainPageComponent;
  let fixture: ComponentFixture<ProjectMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
