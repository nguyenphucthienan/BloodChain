import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardRedeemEthereumSuccessModalComponent } from './reward-redeem-ethereum-success-modal.component';

describe('RewardRedeemEthereumSuccessModalComponent', () => {
  let component: RewardRedeemEthereumSuccessModalComponent;
  let fixture: ComponentFixture<RewardRedeemEthereumSuccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardRedeemEthereumSuccessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardRedeemEthereumSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
