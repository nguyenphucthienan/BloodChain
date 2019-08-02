import { TestBed } from '@angular/core/testing';

import { HospitalBloodProductUseTableService } from './hospital-blood-product-use-table.service';

describe('HospitalBloodProductUseTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalBloodProductUseTableService = TestBed.get(HospitalBloodProductUseTableService);
    expect(service).toBeTruthy();
  });
});
