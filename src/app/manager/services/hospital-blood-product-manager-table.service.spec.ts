import { TestBed } from '@angular/core/testing';

import { HospitalBloodProductManagerTableService } from './hospital-blood-product-manager-table.service';

describe('HospitalBloodProductManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalBloodProductManagerTableService = TestBed.get(HospitalBloodProductManagerTableService);
    expect(service).toBeTruthy();
  });
});
