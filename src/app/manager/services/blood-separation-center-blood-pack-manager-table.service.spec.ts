import { TestBed } from '@angular/core/testing';

import { BloodSeparationCenterBloodPackManagerTableService } from './blood-separation-center-blood-pack-manager-table.service';

describe('BloodSeparationCenterBloodPackManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodSeparationCenterBloodPackManagerTableService = TestBed.get(BloodSeparationCenterBloodPackManagerTableService);
    expect(service).toBeTruthy();
  });
});
