import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { BloodTestCenter } from 'src/app/core/models/blood-test-center.interface';

@Component({
  selector: 'app-blood-test-center-card',
  templateUrl: './blood-test-center-card.component.html',
  styleUrls: ['./blood-test-center-card.component.scss']
})
export class BloodTestCenterCardComponent implements OnInit {

  @Input() bloodTestCenter: BloodTestCenter;

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

    this.galleryImages = this.bloodTestCenter.photos.map(photo => {
      return {
        id: photo._id,
        small: photo.secureUrl,
        medium: photo.secureUrl,
        big: photo.secureUrl
      };
    });
  }

}
