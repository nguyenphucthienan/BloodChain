import { TestBed } from '@angular/core/testing';

import { HospitalBloodProductTransferTableService } from './hospital-blood-product-transfer-table.service';

describe('HospitalBloodProductTransferTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalBloodProductTransferTableService = TestBed.get(HospitalBloodProductTransferTableService);
    expect(service).toBeTruthy();
  });
});
