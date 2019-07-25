import { TestBed } from '@angular/core/testing';

import { ProfileBloodDonationHistoryTableService } from './profile-blood-donation-history-table.service';

describe('ProfileBloodDonationHistoryTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileBloodDonationHistoryTableService = TestBed.get(ProfileBloodDonationHistoryTableService);
    expect(service).toBeTruthy();
  });
});
