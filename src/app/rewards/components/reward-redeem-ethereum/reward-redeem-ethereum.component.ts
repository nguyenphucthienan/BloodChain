import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { EthereumPlanName } from 'src/app/core/constant/ethereum-plan-name';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { RewardService } from 'src/app/core/services/reward.service';
import { environment } from 'src/environments/environment';

import {
  RewardRedeemEthereumConfirmModalComponent,
} from '../../modals/reward-redeem-ethereum-confirm-modal/reward-redeem-ethereum-confirm-modal.component';
import {
  RewardRedeemEthereumSuccessModalComponent,
} from '../../modals/reward-redeem-ethereum-success-modal/reward-redeem-ethereum-success-modal.component';

@Component({
  selector: 'app-reward-redeem-ethereum',
  templateUrl: './reward-redeem-ethereum.component.html',
  styleUrls: ['./reward-redeem-ethereum.component.scss']
})
export class RewardRedeemEthereumComponent implements OnInit, OnDestroy {

  readonly defaultPhotoUrl = environment.photoUrl.defaultUser;

  user: User;
  userInfoOnBlockchain: any;

  ethereumPlans: any[] = [];

  modalRef: MDBModalRef;

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private rewardService: RewardService,
    private modalService: MDBModalService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.getUserInfo();
    this.getEthereumPlans();
  }

  private getUserInfo() {
    this.authService.getMyUserInfo().subscribe((user: User) => {
      this.user = user;
    });

    this.authService.getMyUserInfoOnBlockchain().subscribe((user: any) => {
      this.userInfoOnBlockchain = user;
    });
  }

  private getEthereumPlans() {
    this.rewardService.getEthereumPlans()
      .subscribe((ethereumPlans: any[]) => this.ethereumPlans = ethereumPlans);
  }

  openRewardRedeemEthreumConfirmModal(planName: EthereumPlanName) {
    const ethereumPlan = this.ethereumPlans.find(plan => plan.name === planName);
    this.modalRef = this.modalService.show(RewardRedeemEthereumConfirmModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        ethereumPlan
      }
    });

    this.modalRef.content.rewardRedeemed
      .subscribe((data: any) => this.onRewardRedeemed(ethereumPlan, data.transactionId));
  }

  onRewardRedeemed(ethereumPlan: any, transactionId: string) {
    this.modalRef.hide();
    this.getUserInfo();
    this.openRewardRedeemEthereumSuccessModal(ethereumPlan, transactionId);
  }

  openRewardRedeemEthereumSuccessModal(ethereumPlan: any, transactionId: string) {
    this.modalRef = this.modalService.show(RewardRedeemEthereumSuccessModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        ethereumPlan,
        transactionId
      }
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
