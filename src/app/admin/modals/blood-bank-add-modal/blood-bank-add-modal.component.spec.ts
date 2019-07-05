import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankAddModalComponent } from './blood-bank-add-modal.component';

describe('BloodBankAddModalComponent', () => {
  let component: BloodBankAddModalComponent;
  let fixture: ComponentFixture<BloodBankAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
