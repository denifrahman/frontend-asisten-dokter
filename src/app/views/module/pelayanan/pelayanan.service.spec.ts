import { TestBed } from '@angular/core/testing';

import { PelayananService } from './pelayanan.service';

describe('PelayananService', () => {
  let service: PelayananService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PelayananService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
