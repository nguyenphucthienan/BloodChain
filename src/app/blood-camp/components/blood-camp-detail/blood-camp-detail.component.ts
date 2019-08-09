import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { BloodCamp } from 'src/app/core/models/blood-camp.interface';
import { Point } from 'src/app/core/models/point.interface';

@Component({
  selector: 'app-blood-camp-detail',
  templateUrl: './blood-camp-detail.component.html',
  styleUrls: ['./blood-camp-detail.component.scss']
})
export class BloodCampDetailComponent implements OnInit, OnDestroy {

  bloodCamp: BloodCamp;
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
      this.bloodCamp = data.bloodCamp;
      this.point = this.bloodCamp.location;
      this.galleryImages = this.bloodCamp.photos.map(photo => {
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
