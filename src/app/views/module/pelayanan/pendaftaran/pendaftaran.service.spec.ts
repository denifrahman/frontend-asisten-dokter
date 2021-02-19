import { TestBed } from '@angular/core/testing';

import { PendaftaranService } from './pendaftaran.service';

describe('PendaftaranService', () => {
  let service: PendaftaranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendaftaranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
