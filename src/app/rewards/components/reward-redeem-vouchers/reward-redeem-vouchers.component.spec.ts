import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardRedeemVouchersComponent } from './reward-redeem-vouchers.component';

describe('RewardRedeemVouchersComponent', () => {
  let component: RewardRedeemVouchersComponent;
  let fixture: ComponentFixture<RewardRedeemVouchersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardRedeemVouchersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardRedeemVouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
