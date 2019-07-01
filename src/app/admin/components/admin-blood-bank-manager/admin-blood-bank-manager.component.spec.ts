import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBloodBankManagerComponent } from './admin-blood-bank-manager.component';

describe('AdminBloodBankManagerComponent', () => {
  let component: AdminBloodBankManagerComponent;
  let fixture: ComponentFixture<AdminBloodBankManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBloodBankManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBloodBankManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
