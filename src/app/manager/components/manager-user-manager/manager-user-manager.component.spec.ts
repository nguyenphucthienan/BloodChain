import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUserManagerComponent } from './manager-user-manager.component';

describe('ManagerUserManagerComponent', () => {
  let component: ManagerUserManagerComponent;
  let fixture: ComponentFixture<ManagerUserManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerUserManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerUserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
