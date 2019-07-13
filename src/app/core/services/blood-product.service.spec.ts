import { TestBed } from '@angular/core/testing';

import { BloodProductService } from './blood-product.service';

describe('BloodProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodProductService = TestBed.get(BloodProductService);
    expect(service).toBeTruthy();
  });
});
