import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NgxGalleryAnimation, NgxGalleryComponent, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { BloodTestCenter } from 'src/app/core/models/blood-test-center.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodTestCenterService } from 'src/app/core/services/blood-test-center.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blood-test-center-photo-manager-modal',
  templateUrl: './blood-test-center-photo-manager-modal.component.html',
  styleUrls: ['./blood-test-center-photo-manager-modal.component.scss']
})
export class BloodTestCenterPhotoManagerModalComponent implements OnInit {

  private readonly photoUploadUrl = `${environment.apiUrl}/blood-test-centers/{bloodTestCenterId}/photos`;

  @Input() bloodTestCenterId: string;
  @Input() rowData: TableRow;
  @Output() uploadSucceed = new EventEmitter();
  @Output() uploadFailed = new EventEmitter();
  @Output() closed = new EventEmitter();

  @ViewChild(NgxGalleryComponent) gallery: NgxGalleryComponent;

  bloodTestCenter: BloodTestCenter;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  uploadUrl: string;

  constructor(
    public modalRef: MDBModalRef,
    private bloodTestCenterService: BloodTestCenterService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.uploadUrl = UrlUtils.resolvePathVariables(this.photoUploadUrl, {
      bloodTestCenterId: this.bloodTestCenterId
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

    this.getBloodTestCenter();
  }

  private getBloodTestCenter(goToLastPhoto: boolean = false) {
    this.bloodTestCenterService.getBloodTestCenter(this.bloodTestCenterId)
      .subscribe((bloodTestCenter: BloodTestCenter) => {
        this.bloodTestCenter = bloodTestCenter;
        this.galleryImages = bloodTestCenter.photos.map(photo => {
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
    const photoId = this.bloodTestCenter.photos[selectedIndex]._id;
    this.bloodTestCenterService.deleteBloodTestCenterPhoto(this.bloodTestCenterId, photoId)
      .subscribe(
        (bloodTestCenter: BloodTestCenter) => {
          this.alertService.success('common.alert.deletePhotoSuccess');
          this.bloodTestCenter.photos = this.bloodTestCenter.photos
            .filter(photo => photo._id !== photoId);
          this.galleryImages = this.galleryImages
            .filter(image => this.galleryImages.indexOf(image) !== selectedIndex);

          if (selectedIndex - 1 >= 0) {
            this.gallery.show(selectedIndex - 1);
          }
        },
        error => this.alertService.error('common.alert.deletePhotoFailed'));
  }

  onUploadSucceed(bloodTestCenter: BloodTestCenter) {
    this.uploadSucceed.emit(bloodTestCenter);
    this.alertService.success('common.alert.uploadPhotoSuccess');
    this.getBloodTestCenter(true);
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
