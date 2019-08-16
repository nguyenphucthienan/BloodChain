import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardRedeemVoucherConfirmModalComponent } from './reward-redeem-voucher-confirm-modal.component';

describe('RewardRedeemVoucherConfirmModalComponent', () => {
  let component: RewardRedeemVoucherConfirmModalComponent;
  let fixture: ComponentFixture<RewardRedeemVoucherConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardRedeemVoucherConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardRedeemVoucherConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
