import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NgxGalleryAnimation, NgxGalleryComponent, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { BloodSeparationCenter } from 'src/app/core/models/blood-separation-center.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodSeparationCenterService } from 'src/app/core/services/blood-separation-center.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blood-separation-center-photo-manager-modal',
  templateUrl: './blood-separation-center-photo-manager-modal.component.html',
  styleUrls: ['./blood-separation-center-photo-manager-modal.component.scss']
})
export class BloodSeparationCenterPhotoManagerModalComponent implements OnInit {

  private readonly photoUploadUrl = `${environment.apiUrl}/blood-separation-centers/{bloodSeparationCenterId}/photos`;

  @Input() bloodSeparationCenterId: string;
  @Input() rowData: TableRow;
  @Output() uploadSucceed = new EventEmitter();
  @Output() uploadFailed = new EventEmitter();
  @Output() closed = new EventEmitter();

  @ViewChild(NgxGalleryComponent) gallery: NgxGalleryComponent;

  bloodSeparationCenter: BloodSeparationCenter;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  uploadUrl: string;

  constructor(
    public modalRef: MDBModalRef,
    private bloodSeparationCenterService: BloodSeparationCenterService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.uploadUrl = UrlUtils.resolvePathVariables(this.photoUploadUrl, {
      bloodSeparationCenterId: this.bloodSeparationCenterId
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

    this.getBloodSeparationCenter();
  }

  private getBloodSeparationCenter(goToLastPhoto: boolean = false) {
    this.bloodSeparationCenterService.getBloodSeparationCenter(this.bloodSeparationCenterId)
      .subscribe((bloodSeparationCenter: BloodSeparationCenter) => {
        this.bloodSeparationCenter = bloodSeparationCenter;
        this.galleryImages = bloodSeparationCenter.photos.map(photo => {
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
    const photoId = this.bloodSeparationCenter.photos[selectedIndex]._id;
    this.bloodSeparationCenterService.deleteBloodSeparationCenterPhoto(this.bloodSeparationCenterId, photoId)
      .subscribe(
        (bloodSeparationCenter: BloodSeparationCenter) => {
          this.alertService.success('common.alert.deletePhotoSuccess');
          this.bloodSeparationCenter.photos = this.bloodSeparationCenter.photos
            .filter(photo => photo._id !== photoId);
          this.galleryImages = this.galleryImages
            .filter(image => this.galleryImages.indexOf(image) !== selectedIndex);

          if (selectedIndex - 1 >= 0) {
            this.gallery.show(selectedIndex - 1);
          }
        },
        error => this.alertService.error('common.alert.deletePhotoFailed'));
  }

  onUploadSucceed(bloodSeparationCenter: BloodSeparationCenter) {
    this.uploadSucceed.emit(bloodSeparationCenter);
    this.alertService.success('common.alert.uploadPhotoSuccess');
    this.getBloodSeparationCenter(true);
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
