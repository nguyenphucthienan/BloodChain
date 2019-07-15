import { TestBed } from '@angular/core/testing';

import { BloodSeparationCenterBloodProductTransferTableService } from './blood-separation-center-blood-product-transfer-table.service';

describe('BloodSeparationCenterBloodProductTransferTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodSeparationCenterBloodProductTransferTableService = TestBed.get(BloodSeparationCenterBloodProductTransferTableService);
    expect(service).toBeTruthy();
  });
});
