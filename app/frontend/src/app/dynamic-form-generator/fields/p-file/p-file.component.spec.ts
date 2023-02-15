import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PFileComponent } from './p-file.component';

describe('PFileComponent', () => {
  let component: PFileComponent;
  let fixture: ComponentFixture<PFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
