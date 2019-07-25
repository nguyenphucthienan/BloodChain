import { TestBed } from '@angular/core/testing';

import { DonationHistoryTableService } from './donation-history-table.service';

describe('DonationHistoryTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonationHistoryTableService = TestBed.get(DonationHistoryTableService);
    expect(service).toBeTruthy();
  });
});
