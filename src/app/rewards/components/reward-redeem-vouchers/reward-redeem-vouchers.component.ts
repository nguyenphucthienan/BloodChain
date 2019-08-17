import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { Reward } from 'src/app/core/models/reward.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { RewardService } from 'src/app/core/services/reward.service';
import { environment } from 'src/environments/environment';

import {
  RewardRedeemVoucherSuccessModalComponent,
} from '../../modals/reward-redeem-voucher-success-modal/reward-redeem-voucher-success-modal.component';

@Component({
  selector: 'app-reward-redeem-vouchers',
  templateUrl: './reward-redeem-vouchers.component.html',
  styleUrls: ['./reward-redeem-vouchers.component.scss']
})
export class RewardRedeemVouchersComponent implements OnInit, OnDestroy {

  readonly defaultPhotoUrl = environment.photoUrl.defaultUser;

  user: User;
  userInfoOnBlockchain: any;

  rewards: Reward[] = [];

  pagination: Pagination = {
    page: 1,
    size: 12
  };

  sortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  filterMode: FilterMode = {};

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
    this.getRewards();
  }

  private getUserInfo() {
    this.authService.getMyUserInfo().subscribe((user: User) => {
      this.user = user;
    });

    this.authService.getMyUserInfoOnBlockchain().subscribe((user: any) => {
      this.userInfoOnBlockchain = user;
    });
  }

  private getRewards() {
    this.rewardService.getPublicRewards(this.pagination, this.sortMode, this.filterMode)
      .subscribe((response: any) => {
        this.rewards = response.items;
        this.pagination = response.pagination;
      });
  }

  onPageChanged(page: number) {
    this.pagination.page = page;
    this.getRewards();
  }

  onRewardRedeemed(data: { reward: Reward, code: string }) {
    this.getUserInfo();
    this.getRewards();
    this.openRewardRedeemVoucherSuccessModal(data.reward, data.code);
  }

  openRewardRedeemVoucherSuccessModal(reward: Reward, code: string) {
    this.modalRef = this.modalService.show(RewardRedeemVoucherSuccessModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        reward,
        code
      }
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
