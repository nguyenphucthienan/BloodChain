import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHospitalManagerComponent } from './admin-hospital-manager.component';

describe('AdminHospitalManagerComponent', () => {
  let component: AdminHospitalManagerComponent;
  let fixture: ComponentFixture<AdminHospitalManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHospitalManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHospitalManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
