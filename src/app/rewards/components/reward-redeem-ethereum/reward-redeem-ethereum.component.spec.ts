import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardRedeemEthereumComponent } from './reward-redeem-ethereum.component';

describe('RewardRedeemEthereumComponent', () => {
  let component: RewardRedeemEthereumComponent;
  let fixture: ComponentFixture<RewardRedeemEthereumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardRedeemEthereumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardRedeemEthereumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
