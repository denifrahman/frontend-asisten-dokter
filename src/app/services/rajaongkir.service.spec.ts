import { TestBed } from '@angular/core/testing';

import { RajaongkirService } from './rajaongkir.service';

describe('RajaongkirService', () => {
  let service: RajaongkirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RajaongkirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
