import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneLevelCreationComponent } from './zone-level-creation.component';

describe('ZoneLevelCreationComponent', () => {
  let component: ZoneLevelCreationComponent;
  let fixture: ComponentFixture<ZoneLevelCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneLevelCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneLevelCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
