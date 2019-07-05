import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAssignStaffsModalComponent } from './hospital-assign-staffs-modal.component';

describe('HospitalAssignStaffsModalComponent', () => {
  let component: HospitalAssignStaffsModalComponent;
  let fixture: ComponentFixture<HospitalAssignStaffsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalAssignStaffsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAssignStaffsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
