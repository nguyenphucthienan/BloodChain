import { TestBed } from '@angular/core/testing';

import { BloodTestCenterManagerTableService } from './blood-test-center-manager-table.service';

describe('BloodTestCenterManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodTestCenterManagerTableService = TestBed.get(BloodTestCenterManagerTableService);
    expect(service).toBeTruthy();
  });
});
