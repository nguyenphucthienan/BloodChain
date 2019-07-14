import { TestBed } from '@angular/core/testing';

import { BloodBankBloodProductManagerTableService } from './blood-bank-blood-product-manager-table.service';

describe('BloodBankBloodProductManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodBankBloodProductManagerTableService = TestBed.get(BloodBankBloodProductManagerTableService);
    expect(service).toBeTruthy();
  });
});
