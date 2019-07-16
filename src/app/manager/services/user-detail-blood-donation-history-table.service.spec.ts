import { TestBed } from '@angular/core/testing';

import { UserDetailBloodDonationHistoryTableService } from './user-detail-blood-donation-history-table.service';

describe('UserDetailBloodDonationHistoryTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDetailBloodDonationHistoryTableService = TestBed.get(UserDetailBloodDonationHistoryTableService);
    expect(service).toBeTruthy();
  });
});
