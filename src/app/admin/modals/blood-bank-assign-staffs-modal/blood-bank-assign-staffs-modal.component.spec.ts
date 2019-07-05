import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankAssignStaffsModalComponent } from './blood-bank-assign-staffs-modal.component';

describe('BloodBankAssignStaffsModalComponent', () => {
  let component: BloodBankAssignStaffsModalComponent;
  let fixture: ComponentFixture<BloodBankAssignStaffsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankAssignStaffsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankAssignStaffsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
