import { TestBed } from '@angular/core/testing';

import { UserManagerTableService } from './user-manager-table.service';

describe('UserManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserManagerTableService = TestBed.get(UserManagerTableService);
    expect(service).toBeTruthy();
  });
});
