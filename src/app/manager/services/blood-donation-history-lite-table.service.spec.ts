import { TestBed } from '@angular/core/testing';

import { BloodDonationHistoryLiteTableService } from './blood-donation-history-lite-table.service';

describe('BloodDonationHistoryLiteTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodDonationHistoryLiteTableService = TestBed.get(BloodDonationHistoryLiteTableService);
    expect(service).toBeTruthy();
  });
});
