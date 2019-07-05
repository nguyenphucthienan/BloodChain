import { TestBed } from '@angular/core/testing';

import { BloodTestCenterService } from './blood-test-center.service';

describe('BloodTestCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodTestCenterService = TestBed.get(BloodTestCenterService);
    expect(service).toBeTruthy();
  });
});
