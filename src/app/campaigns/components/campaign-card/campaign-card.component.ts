import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { Campaign } from 'src/app/core/models/campaign.interface';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent implements OnInit {

  @Input() campaign: Campaign;

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '100%',
        preview: false,
        thumbnails: false,
        imageAutoPlay: true,
        imageAutoPlayInterval: 3000,
        imageAutoPlayPauseOnHover: true,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageInfinityMove: true,
        imageArrows: false
      },
      {
        breakpoint: 576,
        width: '100%',
        height: '200px',
      }
    ];

    this.galleryImages = this.campaign.photos.map(photo => {
      return {
        id: photo._id,
        small: photo.secureUrl,
        medium: photo.secureUrl,
        big: photo.secureUrl
      };
    });
  }

}
