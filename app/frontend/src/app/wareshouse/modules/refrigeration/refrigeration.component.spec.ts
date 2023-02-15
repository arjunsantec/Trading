import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrigerationComponent } from './refrigeration.component';

describe('RefrigerationComponent', () => {
  let component: RefrigerationComponent;
  let fixture: ComponentFixture<RefrigerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefrigerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefrigerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
