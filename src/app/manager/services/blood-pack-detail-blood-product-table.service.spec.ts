import { TestBed } from '@angular/core/testing';

import { BloodPackDetailBloodProductTableService } from './blood-pack-detail-blood-product-table.service';

describe('BloodPackDetailBloodProductTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodPackDetailBloodProductTableService = TestBed.get(BloodPackDetailBloodProductTableService);
    expect(service).toBeTruthy();
  });
});
