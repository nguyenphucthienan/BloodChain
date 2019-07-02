import { TestBed } from '@angular/core/testing';

import { TableRowSelectTrackingService } from './table-row-select-tracking.service';

describe('TableRowSelectTrackingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableRowSelectTrackingService = TestBed.get(TableRowSelectTrackingService);
    expect(service).toBeTruthy();
  });
});
