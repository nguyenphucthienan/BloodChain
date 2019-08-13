import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAwardManagerComponent } from './admin-award-manager.component';

describe('AdminAwardManagerComponent', () => {
  let component: AdminAwardManagerComponent;
  let fixture: ComponentFixture<AdminAwardManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAwardManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAwardManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
