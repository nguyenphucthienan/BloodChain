import { TestBed } from '@angular/core/testing';

import { BloodTestCenterBloodPackManagerTableService } from './blood-test-center-blood-pack-manager-table.service';

describe('BloodTestCenterBloodPackManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodTestCenterBloodPackManagerTableService = TestBed.get(BloodTestCenterBloodPackManagerTableService);
    expect(service).toBeTruthy();
  });
});
