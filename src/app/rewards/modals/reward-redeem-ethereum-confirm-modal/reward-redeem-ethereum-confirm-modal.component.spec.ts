import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardRedeemEthereumConfirmModalComponent } from './reward-redeem-ethereum-confirm-modal.component';

describe('RewardRedeemEthereumConfirmModalComponent', () => {
  let component: RewardRedeemEthereumConfirmModalComponent;
  let fixture: ComponentFixture<RewardRedeemEthereumConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardRedeemEthereumConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardRedeemEthereumConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
