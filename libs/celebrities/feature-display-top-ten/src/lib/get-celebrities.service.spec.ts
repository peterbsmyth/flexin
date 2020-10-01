import { TestBed } from '@angular/core/testing';

import { GetCelebritiesService } from './get-celebrities.service';

describe('GetCelebritiesService', () => {
  let service: GetCelebritiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCelebritiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
