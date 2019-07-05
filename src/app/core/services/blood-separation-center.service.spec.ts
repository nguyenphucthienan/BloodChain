import { TestBed } from '@angular/core/testing';

import { BloodSeparationCenterService } from './blood-separation-center.service';

describe('BloodSeparationCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodSeparationCenterService = TestBed.get(BloodSeparationCenterService);
    expect(service).toBeTruthy();
  });
});
