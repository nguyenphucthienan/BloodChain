import { TestBed } from '@angular/core/testing';

import { BloodCampBloodPackManagerTableService } from './blood-camp-blood-pack-manager-table.service';

describe('BloodCampBloodPackManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodCampBloodPackManagerTableService = TestBed.get(BloodCampBloodPackManagerTableService);
    expect(service).toBeTruthy();
  });
});
