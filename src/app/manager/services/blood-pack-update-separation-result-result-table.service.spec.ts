import { TestBed } from '@angular/core/testing';

import { BloodPackUpdateSeparationResultResultTableService } from './blood-pack-update-separation-result-result-table.service';

describe('BloodPackUpdateSeparationResultResultTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodPackUpdateSeparationResultResultTableService = TestBed.get(BloodPackUpdateSeparationResultResultTableService);
    expect(service).toBeTruthy();
  });
});
