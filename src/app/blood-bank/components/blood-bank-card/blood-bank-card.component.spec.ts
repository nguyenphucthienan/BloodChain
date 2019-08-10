import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankCardComponent } from './blood-bank-card.component';

describe('BloodBankCardComponent', () => {
  let component: BloodBankCardComponent;
  let fixture: ComponentFixture<BloodBankCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
