import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalBloodProductManagerTransferBloodProductComponent } from './hospital-blood-product-manager-transfer-blood-product.component';

describe('HospitalBloodProductManagerTransferBloodProductComponent', () => {
  let component: HospitalBloodProductManagerTransferBloodProductComponent;
  let fixture: ComponentFixture<HospitalBloodProductManagerTransferBloodProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalBloodProductManagerTransferBloodProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalBloodProductManagerTransferBloodProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
