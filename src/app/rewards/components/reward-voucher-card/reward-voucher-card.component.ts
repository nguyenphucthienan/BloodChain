import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { Reward } from 'src/app/core/models/reward.interface';

import {
  RewardRedeemConfirmModalComponent,
} from '../../modals/reward-redeem-confirm-modal/reward-redeem-confirm-modal.component';

@Component({
  selector: 'app-reward-voucher-card',
  templateUrl: './reward-voucher-card.component.html',
  styleUrls: ['./reward-voucher-card.component.scss']
})
export class RewardVoucherCardComponent implements OnInit {

  @Input() reward: Reward;
  @Output() rewardRedeemed = new EventEmitter<boolean>();

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  modalRef: MDBModalRef;

  constructor(private modalService: MDBModalService) { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '200px',
        preview: false,
        thumbnails: false,
        imageAutoPlay: true,
        imageAutoPlayInterval: 3000,
        imageAutoPlayPauseOnHover: true,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageInfinityMove: true,
        imageArrows: false
      }
    ];

    this.galleryImages = this.reward.photos.map(photo => {
      return {
        id: photo._id,
        small: photo.secureUrl,
        medium: photo.secureUrl,
        big: photo.secureUrl
      };
    });
  }

  openRewardRedeemConfirmModal() {
    this.modalRef = this.modalService.show(RewardRedeemConfirmModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        reward: this.reward
      }
    });

    this.modalRef.content.rewardRedeemed
      .subscribe((result: boolean) => this.onRewardRedeemed(result));
  }

  onRewardRedeemed(result: boolean) {
    this.modalRef.hide();
    this.rewardRedeemed.emit(result);
  }

  openRewardInfoModal() {
  }

}
