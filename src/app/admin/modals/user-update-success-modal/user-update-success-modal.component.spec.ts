import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateSuccessModalComponent } from './user-update-success-modal.component';

describe('UserUpdateSuccessModalComponent', () => {
  let component: UserUpdateSuccessModalComponent;
  let fixture: ComponentFixture<UserUpdateSuccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdateSuccessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
