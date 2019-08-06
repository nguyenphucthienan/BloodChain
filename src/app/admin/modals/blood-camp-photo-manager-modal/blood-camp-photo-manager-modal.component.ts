import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NgxGalleryAnimation, NgxGalleryComponent, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { BloodCamp } from 'src/app/core/models/blood-camp.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodCampService } from 'src/app/core/services/blood-camp.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blood-camp-photo-manager-modal',
  templateUrl: './blood-camp-photo-manager-modal.component.html',
  styleUrls: ['./blood-camp-photo-manager-modal.component.scss']
})
export class BloodCampPhotoManagerModalComponent implements OnInit {

  private readonly photoUploadUrl = `${environment.apiUrl}/blood-camps/{bloodCampId}/photos`;

  @Input() bloodCampId: string;
  @Input() rowData: TableRow;
  @Output() uploadSucceed = new EventEmitter();
  @Output() uploadFailed = new EventEmitter();
  @Output() closed = new EventEmitter();

  @ViewChild(NgxGalleryComponent) gallery: NgxGalleryComponent;

  bloodCamp: BloodCamp;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  uploadUrl: string;

  constructor(
    public modalRef: MDBModalRef,
    private bloodCampService: BloodCampService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.uploadUrl = UrlUtils.resolvePathVariables(this.photoUploadUrl, {
      bloodCampId: this.bloodCampId
    });

    this.galleryOptions = [{
      width: '100%',
      height: '500px',
      thumbnailsColumns: 5,
      imageAnimation: NgxGalleryAnimation.Slide,
      imageInfinityMove: true,
      previewInfinityMove: true,
      previewZoom: true,
      previewFullscreen: true,
      previewCloseOnEsc: true
    }];

    this.getBloodCamp();
  }

  private getBloodCamp(goToLastPhoto: boolean = false) {
    this.bloodCampService.getBloodCamp(this.bloodCampId)
      .subscribe((bloodCamp: BloodCamp) => {
        this.bloodCamp = bloodCamp;
        this.galleryImages = bloodCamp.photos.map(photo => {
          return {
            id: photo._id,
            small: photo.secureUrl,
            medium: photo.secureUrl,
            big: photo.secureUrl
          };
        });

        if (goToLastPhoto && this.gallery) {
          this.gallery.show(this.galleryImages.length - 1);
        }
      });
  }

  deletePhoto() {
    const selectedIndex = this.gallery.selectedIndex;
    const photoId = this.bloodCamp.photos[selectedIndex]._id;
    this.bloodCampService.deleteBloodCampPhoto(this.bloodCampId, photoId)
      .subscribe(
        (bloodCamp: BloodCamp) => {
          this.alertService.success('common.alert.deletePhotoSuccess');
          this.bloodCamp.photos = this.bloodCamp.photos
            .filter(photo => photo._id !== photoId);
          this.galleryImages = this.galleryImages
            .filter(image => this.galleryImages.indexOf(image) !== selectedIndex);

          if (selectedIndex - 1 >= 0) {
            this.gallery.show(selectedIndex - 1);
          }
        },
        error => this.alertService.error('common.alert.deletePhotoFailed'));
  }

  onUploadSucceed(bloodCamp: BloodCamp) {
    this.uploadSucceed.emit(bloodCamp);
    this.alertService.success('common.alert.uploadPhotoSuccess');
    this.getBloodCamp(true);
  }

  onUploadFailed() {
    this.uploadFailed.emit();
    this.alertService.error('common.alert.uploadPhotoFailed');
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}
