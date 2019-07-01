import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBloodSeparationCenterManagerComponent } from './admin-blood-separation-center-manager.component';

describe('AdminBloodSeparationCenterManagerComponent', () => {
  let component: AdminBloodSeparationCenterManagerComponent;
  let fixture: ComponentFixture<AdminBloodSeparationCenterManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBloodSeparationCenterManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBloodSeparationCenterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
