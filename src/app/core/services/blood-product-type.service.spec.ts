import { TestBed } from '@angular/core/testing';

import { BloodProductTypeService } from './blood-product-type.service';

describe('BloodProductTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodProductTypeService = TestBed.get(BloodProductTypeService);
    expect(service).toBeTruthy();
  });
});
