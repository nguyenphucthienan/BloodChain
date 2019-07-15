import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankBloodProductManagerTransferBloodProductComponent } from './blood-bank-blood-product-manager-transfer-blood-product.component';

describe('BloodBankBloodProductManagerTransferBloodProductComponent', () => {
  let component: BloodBankBloodProductManagerTransferBloodProductComponent;
  let fixture: ComponentFixture<BloodBankBloodProductManagerTransferBloodProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankBloodProductManagerTransferBloodProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankBloodProductManagerTransferBloodProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
