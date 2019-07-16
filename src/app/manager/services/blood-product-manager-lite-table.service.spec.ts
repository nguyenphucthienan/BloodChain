import { TestBed } from '@angular/core/testing';

import { BloodProductManagerLiteTableService } from './blood-product-manager-lite-table.service';

describe('BloodProductManagerLiteTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodProductManagerLiteTableService = TestBed.get(BloodProductManagerLiteTableService);
    expect(service).toBeTruthy();
  });
});
