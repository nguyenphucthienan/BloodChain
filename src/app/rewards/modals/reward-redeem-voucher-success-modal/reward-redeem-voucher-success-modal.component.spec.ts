import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardRedeemVoucherSuccessModalComponent } from './reward-redeem-voucher-success-modal.component';

describe('RewardRedeemVoucherSuccessModalComponent', () => {
  let component: RewardRedeemVoucherSuccessModalComponent;
  let fixture: ComponentFixture<RewardRedeemVoucherSuccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardRedeemVoucherSuccessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardRedeemVoucherSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
