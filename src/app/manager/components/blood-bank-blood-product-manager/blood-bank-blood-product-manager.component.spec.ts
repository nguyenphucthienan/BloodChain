import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankBloodProductManagerComponent } from './blood-bank-blood-product-manager.component';

describe('BloodBankBloodProductManagerComponent', () => {
  let component: BloodBankBloodProductManagerComponent;
  let fixture: ComponentFixture<BloodBankBloodProductManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankBloodProductManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankBloodProductManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
