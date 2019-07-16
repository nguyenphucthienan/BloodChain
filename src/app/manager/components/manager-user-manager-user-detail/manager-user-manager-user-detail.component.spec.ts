import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUserManagerUserDetailComponent } from './manager-user-manager-user-detail.component';

describe('ManagerUserManagerUserDetailComponent', () => {
  let component: ManagerUserManagerUserDetailComponent;
  let fixture: ComponentFixture<ManagerUserManagerUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerUserManagerUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerUserManagerUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
