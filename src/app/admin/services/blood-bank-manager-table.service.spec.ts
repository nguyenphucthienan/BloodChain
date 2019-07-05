import { TestBed } from '@angular/core/testing';

import { BloodBankManagerTableService } from './blood-bank-manager-table.service';

describe('BloodBankManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodBankManagerTableService = TestBed.get(BloodBankManagerTableService);
    expect(service).toBeTruthy();
  });
});
