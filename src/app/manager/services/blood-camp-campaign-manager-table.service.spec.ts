import { TestBed } from '@angular/core/testing';

import { BloodCampCampaignManagerTableService } from './blood-camp-campaign-manager-table.service';

describe('BloodCampCampaignManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodCampCampaignManagerTableService = TestBed.get(BloodCampCampaignManagerTableService);
    expect(service).toBeTruthy();
  });
});
