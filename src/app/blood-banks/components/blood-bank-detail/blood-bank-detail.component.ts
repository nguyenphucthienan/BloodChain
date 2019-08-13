import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { BloodBank } from 'src/app/core/models/blood-bank.interface';
import { Point } from 'src/app/core/models/point.interface';

@Component({
  selector: 'app-blood-bank-detail',
  templateUrl: './blood-bank-detail.component.html',
  styleUrls: ['./blood-bank-detail.component.scss']
})
export class BloodBankDetailComponent implements OnInit, OnDestroy {

  bloodBank: BloodBank;
  point: Point;

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.galleryOptions = [{
      width: '100%',
      height: '600px',
      thumbnailsColumns: 5,
      thumbnailsArrowsAutoHide: true,
      imageAnimation: NgxGalleryAnimation.Slide,
      imageInfinityMove: true,
      imageArrowsAutoHide: true,
      previewInfinityMove: true,
      previewZoom: true,
      previewFullscreen: true,
      previewCloseOnEsc: true
    }];

    this.route.data.subscribe((data: any) => {
      this.bloodBank = data.bloodBank;
      this.point = this.bloodBank.location;
      this.galleryImages = this.bloodBank.photos.map(photo => {
        return {
          id: photo._id,
          small: photo.secureUrl,
          medium: photo.secureUrl,
          big: photo.secureUrl
        };
      });
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
