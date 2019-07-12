import { TestBed } from '@angular/core/testing';

import { BloodTestCenterBloodPackTransferTableService } from './blood-test-center-blood-pack-transfer-table.service';

describe('BloodTestCenterBloodPackTransferTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodTestCenterBloodPackTransferTableService = TestBed.get(BloodTestCenterBloodPackTransferTableService);
    expect(service).toBeTruthy();
  });
});
