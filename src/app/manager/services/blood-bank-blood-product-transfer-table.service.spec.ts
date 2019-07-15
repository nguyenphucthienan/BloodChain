import { TestBed } from '@angular/core/testing';

import { BloodBankBloodProductTransferTableService } from './blood-bank-blood-product-transfer-table.service';

describe('BloodBankBloodProductTransferTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodBankBloodProductTransferTableService = TestBed.get(BloodBankBloodProductTransferTableService);
    expect(service).toBeTruthy();
  });
});
