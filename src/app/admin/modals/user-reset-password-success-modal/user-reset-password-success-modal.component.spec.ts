import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResetPasswordSuccessModalComponent } from './user-reset-password-success-modal.component';

describe('UserResetPasswordSuccessModalComponent', () => {
  let component: UserResetPasswordSuccessModalComponent;
  let fixture: ComponentFixture<UserResetPasswordSuccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserResetPasswordSuccessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResetPasswordSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
