import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikelListeComponent } from './artikel-liste.component';

describe('ArtikelListeComponent', () => {
  let component: ArtikelListeComponent;
  let fixture: ComponentFixture<ArtikelListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtikelListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtikelListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
