import { TestBed } from '@angular/core/testing';

import { LokasiPraktekService } from './lokasi-praktek.service';

describe('LokasiPraktekService', () => {
  let service: LokasiPraktekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LokasiPraktekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
