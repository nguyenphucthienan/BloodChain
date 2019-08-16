import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reward } from 'src/app/core/models/reward.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { RewardService } from 'src/app/core/services/reward.service';

@Component({
  selector: 'app-reward-redeem-confirm-modal',
  templateUrl: './reward-redeem-confirm-modal.component.html',
  styleUrls: ['./reward-redeem-confirm-modal.component.scss']
})
export class RewardRedeemConfirmModalComponent implements OnInit {

  @Input() reward: Reward;
  @Output() rewardRedeemed = new EventEmitter<boolean>();

  currentPoint: number;
  rewardPoint: number;
  remainingPoint: number;

  constructor(
    public modalRef: MDBModalRef,
    private authService: AuthService,
    private rewardService: RewardService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.authService.getMyUserInfoOnBlockchain().subscribe((user: any) => {
      this.currentPoint = user ? user.point : 0;
      this.rewardPoint = this.reward.point;
      this.remainingPoint = this.currentPoint - this.rewardPoint;
    });
  }

  redeemAward() {
    this.spinnerService.show();
    this.rewardService.redeemReward(this.reward._id)
      .subscribe(
        () => {
          this.spinnerService.hide();
          this.rewardRedeemed.emit(true);
        },
        (error) => {
          this.spinnerService.hide();
          this.rewardRedeemed.emit(false);
        }
      );
  }

}
