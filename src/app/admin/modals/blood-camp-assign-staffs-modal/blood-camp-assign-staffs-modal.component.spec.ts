import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampAssignStaffsModalComponent } from './blood-camp-assign-staffs-modal.component';

describe('BloodCampAssignStaffsModalComponent', () => {
  let component: BloodCampAssignStaffsModalComponent;
  let fixture: ComponentFixture<BloodCampAssignStaffsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampAssignStaffsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampAssignStaffsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
