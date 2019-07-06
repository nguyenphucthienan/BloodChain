import { TestBed } from '@angular/core/testing';

import { BloodPackManagerLiteTableService } from './blood-pack-manager-lite-table.service';

describe('BloodPackManagerLiteTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodPackManagerLiteTableService = TestBed.get(BloodPackManagerLiteTableService);
    expect(service).toBeTruthy();
  });
});
