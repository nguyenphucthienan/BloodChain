import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserManagerUpdateUserComponent } from './admin-user-manager-update-user.component';

describe('AdminUserManagerUpdateUserComponent', () => {
  let component: AdminUserManagerUpdateUserComponent;
  let fixture: ComponentFixture<AdminUserManagerUpdateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserManagerUpdateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserManagerUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
