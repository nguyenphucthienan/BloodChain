import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUserManagerAddUserComponent } from './manager-user-manager-add-user.component';

describe('ManagerUserManagerAddUserComponent', () => {
  let component: ManagerUserManagerAddUserComponent;
  let fixture: ComponentFixture<ManagerUserManagerAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerUserManagerAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerUserManagerAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
