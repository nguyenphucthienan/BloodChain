import { TestBed } from '@angular/core/testing';

import { UserManagerLiteTableService } from './user-manager-lite-table.service';

describe('UserManagerLiteTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserManagerLiteTableService = TestBed.get(UserManagerLiteTableService);
    expect(service).toBeTruthy();
  });
});
