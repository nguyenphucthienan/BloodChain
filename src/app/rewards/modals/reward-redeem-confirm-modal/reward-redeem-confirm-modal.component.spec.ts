import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardRedeemConfirmModalComponent } from './reward-redeem-confirm-modal.component';

describe('RewardRedeemConfirmModalComponent', () => {
  let component: RewardRedeemConfirmModalComponent;
  let fixture: ComponentFixture<RewardRedeemConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardRedeemConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardRedeemConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
