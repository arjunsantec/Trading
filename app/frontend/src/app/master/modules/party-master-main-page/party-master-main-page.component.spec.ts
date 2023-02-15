import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyMasterMainPageComponent } from './party-master-main-page.component';

describe('PartyMasterMainPageComponent', () => {
  let component: PartyMasterMainPageComponent;
  let fixture: ComponentFixture<PartyMasterMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyMasterMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyMasterMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
