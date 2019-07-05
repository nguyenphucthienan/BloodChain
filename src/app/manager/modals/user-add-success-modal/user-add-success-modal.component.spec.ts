import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddSuccessModalComponent } from './user-add-success-modal.component';

describe('UserAddSuccessModalComponent', () => {
  let component: UserAddSuccessModalComponent;
  let fixture: ComponentFixture<UserAddSuccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddSuccessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
