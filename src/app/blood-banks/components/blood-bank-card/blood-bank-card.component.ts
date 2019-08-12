import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { BloodBank } from 'src/app/core/models/blood-bank.interface';

@Component({
  selector: 'app-blood-bank-card',
  templateUrl: './blood-bank-card.component.html',
  styleUrls: ['./blood-bank-card.component.scss']
})
export class BloodBankCardComponent implements OnInit {

  @Input() bloodBank: BloodBank;

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

    this.galleryImages = this.bloodBank.photos.map(photo => {
      return {
        id: photo._id,
        small: photo.secureUrl,
        medium: photo.secureUrl,
        big: photo.secureUrl
      };
    });
  }

}
