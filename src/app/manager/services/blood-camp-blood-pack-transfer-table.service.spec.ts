import { TestBed } from '@angular/core/testing';

import { BloodCampBloodPackTransferTableService } from './blood-camp-blood-pack-transfer-table.service';

describe('BloodCampBloodPackTransferTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodCampBloodPackTransferTableService = TestBed.get(BloodCampBloodPackTransferTableService);
    expect(service).toBeTruthy();
  });
});
