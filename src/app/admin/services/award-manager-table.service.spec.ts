import { TestBed } from '@angular/core/testing';

import { AwardManagerTableService } from './award-manager-table.service';

describe('AwardManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwardManagerTableService = TestBed.get(AwardManagerTableService);
    expect(service).toBeTruthy();
  });
});
