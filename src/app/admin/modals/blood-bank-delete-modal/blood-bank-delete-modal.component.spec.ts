import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankDeleteModalComponent } from './blood-bank-delete-modal.component';

describe('BloodBankDeleteModalComponent', () => {
  let component: BloodBankDeleteModalComponent;
  let fixture: ComponentFixture<BloodBankDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
