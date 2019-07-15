import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCenterBloodProductManagerTransferBloodProductComponent } from './blood-separation-center-blood-product-manager-transfer-blood-product.component';

describe('BloodSeparationCenterBloodProductManagerTransferBloodProductComponent', () => {
  let component: BloodSeparationCenterBloodProductManagerTransferBloodProductComponent;
  let fixture: ComponentFixture<BloodSeparationCenterBloodProductManagerTransferBloodProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCenterBloodProductManagerTransferBloodProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCenterBloodProductManagerTransferBloodProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
