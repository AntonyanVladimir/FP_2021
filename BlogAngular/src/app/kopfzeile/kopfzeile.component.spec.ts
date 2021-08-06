import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KopfzeileComponent } from './kopfzeile.component';

describe('KopfzeileComponent', () => {
  let component: KopfzeileComponent;
  let fixture: ComponentFixture<KopfzeileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KopfzeileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KopfzeileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
