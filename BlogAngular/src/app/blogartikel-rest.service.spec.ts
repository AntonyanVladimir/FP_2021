import { TestBed } from '@angular/core/testing';

import { BlogartikelRestService } from './blogartikel-rest.service';

describe('BlogartikelRestService', () => {
  let service: BlogartikelRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogartikelRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
