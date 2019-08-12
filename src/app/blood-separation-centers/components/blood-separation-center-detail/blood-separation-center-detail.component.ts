import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { BloodSeparationCenter } from 'src/app/core/models/blood-separation-center.interface';
import { Point } from 'src/app/core/models/point.interface';

@Component({
  selector: 'app-blood-separation-center-detail',
  templateUrl: './blood-separation-center-detail.component.html',
  styleUrls: ['./blood-separation-center-detail.component.scss']
})
export class BloodSeparationCenterDetailComponent implements OnInit, OnDestroy {

  bloodSeparationCenter: BloodSeparationCenter;
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
      previewCloseOnEsc: true,
    }];

    this.route.data.subscribe((data: any) => {
      this.bloodSeparationCenter = data.bloodSeparationCenter;
      this.point = this.bloodSeparationCenter.location;
      this.galleryImages = this.bloodSeparationCenter.photos.map(photo => {
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
