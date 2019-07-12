import { TestBed } from '@angular/core/testing';

import { BloodProductTypeManagerTableService } from './blood-product-type-manager-table.service';

describe('BloodProductTypeManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodProductTypeManagerTableService = TestBed.get(BloodProductTypeManagerTableService);
    expect(service).toBeTruthy();
  });
});
