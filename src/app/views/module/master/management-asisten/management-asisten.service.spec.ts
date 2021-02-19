import { TestBed } from '@angular/core/testing';

import { ManagementAsistenService } from './management-asisten.service';

describe('ManagementAsistenService', () => {
  let service: ManagementAsistenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementAsistenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
