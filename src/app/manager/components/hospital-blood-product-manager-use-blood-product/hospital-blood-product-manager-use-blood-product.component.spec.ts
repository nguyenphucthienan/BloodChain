import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalBloodProductManagerUseBloodProductComponent } from './hospital-blood-product-manager-use-blood-product.component';

describe('HospitalBloodProductManagerUseBloodProductComponent', () => {
  let component: HospitalBloodProductManagerUseBloodProductComponent;
  let fixture: ComponentFixture<HospitalBloodProductManagerUseBloodProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalBloodProductManagerUseBloodProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalBloodProductManagerUseBloodProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
