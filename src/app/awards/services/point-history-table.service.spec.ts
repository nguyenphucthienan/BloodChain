import { TestBed } from '@angular/core/testing';

import { PointHistoryTableService } from './point-history-table.service';

describe('PointHistoryTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointHistoryTableService = TestBed.get(PointHistoryTableService);
    expect(service).toBeTruthy();
  });
});
