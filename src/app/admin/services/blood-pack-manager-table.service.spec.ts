import { TestBed } from '@angular/core/testing';

import { BloodPackManagerTableService } from './blood-pack-manager-table.service';

describe('BloodPackManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodPackManagerTableService = TestBed.get(BloodPackManagerTableService);
    expect(service).toBeTruthy();
  });
});
