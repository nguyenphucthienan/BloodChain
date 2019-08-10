import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { Hospital } from 'src/app/core/models/hospital.interface';
import { Point } from 'src/app/core/models/point.interface';

@Component({
  selector: 'app-hospital-detail',
  templateUrl: './hospital-detail.component.html',
  styleUrls: ['./hospital-detail.component.scss']
})
export class HospitalDetailComponent implements OnInit, OnDestroy {

  hospital: Hospital;
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
      this.hospital = data.hospital;
      this.point = this.hospital.location;
      this.galleryImages = this.hospital.photos.map(photo => {
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
