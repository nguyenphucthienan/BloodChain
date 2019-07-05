import { TestBed } from '@angular/core/testing';

import { BloodSeparationCenterManagerTableService } from './blood-separation-center-manager-table.service';

describe('BloodSeparationCenterManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodSeparationCenterManagerTableService = TestBed.get(BloodSeparationCenterManagerTableService);
    expect(service).toBeTruthy();
  });
});
