import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { Reward } from 'src/app/core/models/reward.interface';

@Component({
  selector: 'app-reward-voucher-card',
  templateUrl: './reward-voucher-card.component.html',
  styleUrls: ['./reward-voucher-card.component.scss']
})
export class RewardVoucherCardComponent implements OnInit {

  @Input() reward: Reward;

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor() { }

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

  openRedeemRewardConfirmModal() {

  }

  openRewardInfoModal() {

  }

}
