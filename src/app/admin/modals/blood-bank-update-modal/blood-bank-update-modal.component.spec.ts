import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankUpdateModalComponent } from './blood-bank-update-modal.component';

describe('BloodBankUpdateModalComponent', () => {
  let component: BloodBankUpdateModalComponent;
  let fixture: ComponentFixture<BloodBankUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
