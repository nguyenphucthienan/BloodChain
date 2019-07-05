import { TestBed } from '@angular/core/testing';

import { HospitalManagerTableService } from './hospital-manager-table.service';

describe('HospitalManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalManagerTableService = TestBed.get(HospitalManagerTableService);
    expect(service).toBeTruthy();
  });
});
