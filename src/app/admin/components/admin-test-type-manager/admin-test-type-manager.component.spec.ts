import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTestTypeManagerComponent } from './admin-test-type-manager.component';

describe('AdminTestTypeManagerComponent', () => {
  let component: AdminTestTypeManagerComponent;
  let fixture: ComponentFixture<AdminTestTypeManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTestTypeManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTestTypeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
