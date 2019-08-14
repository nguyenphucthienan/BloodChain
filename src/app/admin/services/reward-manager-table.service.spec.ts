import { TestBed } from '@angular/core/testing';

import { RewardManagerTableService } from './reward-manager-table.service';

describe('RewardManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RewardManagerTableService = TestBed.get(RewardManagerTableService);
    expect(service).toBeTruthy();
  });
});
