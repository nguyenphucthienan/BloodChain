import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankDetailComponent } from './blood-bank-detail.component';

describe('BloodBankDetailComponent', () => {
  let component: BloodBankDetailComponent;
  let fixture: ComponentFixture<BloodBankDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
