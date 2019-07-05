import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTestCenterAssignStaffsModalComponent } from './blood-test-center-assign-staffs-modal.component';

describe('BloodTestCenterAssignStaffsModalComponent', () => {
  let component: BloodTestCenterAssignStaffsModalComponent;
  let fixture: ComponentFixture<BloodTestCenterAssignStaffsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodTestCenterAssignStaffsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTestCenterAssignStaffsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
