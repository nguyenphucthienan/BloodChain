import { TestBed } from '@angular/core/testing';

import { BloodCampService } from './blood-camp.service';

describe('BloodCampService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodCampService = TestBed.get(BloodCampService);
    expect(service).toBeTruthy();
  });
});
