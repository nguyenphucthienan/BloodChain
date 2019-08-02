import { TestBed } from '@angular/core/testing';

import { HospitalBloodProductConsumeTableService } from './hospital-blood-product-consume-table.service';

describe('HospitalBloodProductConsumeTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalBloodProductConsumeTableService = TestBed.get(HospitalBloodProductConsumeTableService);
    expect(service).toBeTruthy();
  });
});
