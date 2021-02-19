import { TestBed } from '@angular/core/testing';

import { AppInterceptorsService } from './app-interceptors.service';

describe('AppInterceptorsService', () => {
  let service: AppInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
