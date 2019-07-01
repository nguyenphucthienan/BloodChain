import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBloodCampManagerComponent } from './admin-blood-camp-manager.component';

describe('AdminBloodCampManagerComponent', () => {
  let component: AdminBloodCampManagerComponent;
  let fixture: ComponentFixture<AdminBloodCampManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBloodCampManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBloodCampManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
