import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfCreationComponent } from './shelf-creation.component';

describe('ShelfCreationComponent', () => {
  let component: ShelfCreationComponent;
  let fixture: ComponentFixture<ShelfCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelfCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
