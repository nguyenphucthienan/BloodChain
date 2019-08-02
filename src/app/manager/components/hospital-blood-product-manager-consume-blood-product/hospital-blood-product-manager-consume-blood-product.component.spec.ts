import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalBloodProductManagerConsumeBloodProductComponent } from './hospital-blood-product-manager-consume-blood-product.component';

describe('HospitalBloodProductManagerConsumeBloodProductComponent', () => {
  let component: HospitalBloodProductManagerConsumeBloodProductComponent;
  let fixture: ComponentFixture<HospitalBloodProductManagerConsumeBloodProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalBloodProductManagerConsumeBloodProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalBloodProductManagerConsumeBloodProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
