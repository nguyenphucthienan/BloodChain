import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSeparationCenterAssignStaffsModalComponent } from './blood-separation-center-assign-staffs-modal.component';

describe('BloodSeparationCenterAssignStaffsModalComponent', () => {
  let component: BloodSeparationCenterAssignStaffsModalComponent;
  let fixture: ComponentFixture<BloodSeparationCenterAssignStaffsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSeparationCenterAssignStaffsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSeparationCenterAssignStaffsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
