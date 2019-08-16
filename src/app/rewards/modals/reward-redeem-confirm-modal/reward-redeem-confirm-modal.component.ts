import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reward } from 'src/app/core/models/reward.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { RewardService } from 'src/app/core/services/reward.service';

@Component({
  selector: 'app-reward-redeem-confirm-modal',
  templateUrl: './reward-redeem-confirm-modal.component.html',
  styleUrls: ['./reward-redeem-confirm-modal.component.scss']
})
export class RewardRedeemConfirmModalComponent implements OnInit {

  @Input() reward: Reward;
  @Output() rewardRedeemed = new EventEmitter();

  loading = true;
  currentPoint: number;
  rewardPoint: number;
  remainingPoint: number;

  constructor(
    public modalRef: MDBModalRef,
    private authService: AuthService,
    private rewardService: RewardService,
    private alertService: AlertService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.authService.getMyUserInfoOnBlockchain().subscribe((user: any) => {
      this.loading = false;
      this.currentPoint = user ? user.point : 0;
      this.rewardPoint = this.reward.point;
      this.remainingPoint = this.currentPoint - this.rewardPoint;
    });
  }

  redeemAward() {
    this.spinnerService.show();
    this.rewardService.redeemReward(this.reward._id)
      .subscribe(
        (response) => {
          this.spinnerService.hide();
          this.alertService.success('rewardManager.message.redeemRewardSuccess');
          this.rewardRedeemed.emit({
            reward: this.reward,
            code: response.code
          });
        },
        (error) => {
          this.spinnerService.hide();
          this.alertService.error('rewardManager.message.redeemRewardFailed');
        }
      );
  }

}
