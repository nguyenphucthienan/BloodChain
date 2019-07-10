import { TestBed } from '@angular/core/testing';

import { TestTypeManagerTableService } from './test-type-manager-table.service';

describe('TestTypeManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestTypeManagerTableService = TestBed.get(TestTypeManagerTableService);
    expect(service).toBeTruthy();
  });
});
