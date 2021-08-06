import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhaltsbereichComponent } from './inhaltsbereich.component';

describe('InhaltsbereichComponent', () => {
  let component: InhaltsbereichComponent;
  let fixture: ComponentFixture<InhaltsbereichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InhaltsbereichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InhaltsbereichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
