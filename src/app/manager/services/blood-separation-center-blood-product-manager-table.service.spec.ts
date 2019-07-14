import { TestBed } from '@angular/core/testing';

import { BloodSeparationCenterBloodProductManagerTableService } from './blood-separation-center-blood-product-manager-table.service';

describe('BloodSeparationCenterBloodProductManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodSeparationCenterBloodProductManagerTableService = TestBed.get(BloodSeparationCenterBloodProductManagerTableService);
    expect(service).toBeTruthy();
  });
});
