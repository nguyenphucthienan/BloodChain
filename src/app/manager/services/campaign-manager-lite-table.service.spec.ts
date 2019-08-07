import { TestBed } from '@angular/core/testing';

import { CampaignManagerLiteTableService } from './campaign-manager-lite-table.service';

describe('CampaignManagerLiteTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampaignManagerLiteTableService = TestBed.get(CampaignManagerLiteTableService);
    expect(service).toBeTruthy();
  });
});
