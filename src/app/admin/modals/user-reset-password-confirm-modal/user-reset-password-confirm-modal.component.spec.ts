import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResetPasswordConfirmModalComponent } from './user-reset-password-confirm-modal.component';

describe('UserResetPasswordConfirmModalComponent', () => {
  let component: UserResetPasswordConfirmModalComponent;
  let fixture: ComponentFixture<UserResetPasswordConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserResetPasswordConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResetPasswordConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
