import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductTypeDeleteModalComponent } from './blood-product-type-delete-modal.component';

describe('BloodProductTypeDeleteModalComponent', () => {
  let component: BloodProductTypeDeleteModalComponent;
  let fixture: ComponentFixture<BloodProductTypeDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductTypeDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductTypeDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
