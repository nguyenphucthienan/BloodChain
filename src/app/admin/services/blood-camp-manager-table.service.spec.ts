import { TestBed } from '@angular/core/testing';

import { BloodCampManagerTableService } from './blood-camp-manager-table.service';

describe('BloodCampManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodCampManagerTableService = TestBed.get(BloodCampManagerTableService);
    expect(service).toBeTruthy();
  });
});
