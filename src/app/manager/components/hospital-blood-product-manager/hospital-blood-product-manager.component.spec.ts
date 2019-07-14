import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalBloodProductManagerComponent } from './hospital-blood-product-manager.component';

describe('HospitalBloodProductManagerComponent', () => {
  let component: HospitalBloodProductManagerComponent;
  let fixture: ComponentFixture<HospitalBloodProductManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalBloodProductManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalBloodProductManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
