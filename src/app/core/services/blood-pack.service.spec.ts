import { TestBed } from '@angular/core/testing';

import { BloodPackService } from './blood-pack.service';

describe('BloodPackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodPackService = TestBed.get(BloodPackService);
    expect(service).toBeTruthy();
  });
});
