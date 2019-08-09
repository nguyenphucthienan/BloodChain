import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions, NgxGalleryLayout } from 'ngx-gallery';
import { BloodCamp } from 'src/app/core/models/blood-camp.interface';

@Component({
  selector: 'app-blood-camp-card',
  templateUrl: './blood-camp-card.component.html',
  styleUrls: ['./blood-camp-card.component.scss']
})
export class BloodCampCardComponent implements OnInit {

  @Input() bloodCamp: BloodCamp;

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

    this.galleryImages = this.bloodCamp.photos.map(photo => {
      return {
        id: photo._id,
        small: photo.secureUrl,
        medium: photo.secureUrl,
        big: photo.secureUrl
      };
    });
  }

}
