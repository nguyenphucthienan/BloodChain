import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { BloodTestCenter } from 'src/app/core/models/blood-test-center.interface';
import { Point } from 'src/app/core/models/point.interface';

@Component({
  selector: 'app-blood-test-center-detail',
  templateUrl: './blood-test-center-detail.component.html',
  styleUrls: ['./blood-test-center-detail.component.scss']
})
export class BloodTestCenterDetailComponent implements OnInit, OnDestroy {

  bloodTestCenter: BloodTestCenter;
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
      this.bloodTestCenter = data.bloodTestCenter;
      this.point = this.bloodTestCenter.location;
      this.galleryImages = this.bloodTestCenter.photos.map(photo => {
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
