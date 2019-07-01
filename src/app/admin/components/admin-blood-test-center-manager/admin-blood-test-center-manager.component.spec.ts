import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBloodTestCenterManagerComponent } from './admin-blood-test-center-manager.component';

describe('AdminBloodTestCenterManagerComponent', () => {
  let component: AdminBloodTestCenterManagerComponent;
  let fixture: ComponentFixture<AdminBloodTestCenterManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBloodTestCenterManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBloodTestCenterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
