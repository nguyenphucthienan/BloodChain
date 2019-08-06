import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NgxGalleryAnimation, NgxGalleryComponent, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { Hospital } from 'src/app/core/models/hospital.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { HospitalService } from 'src/app/core/services/hospital.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hospital-photo-manager-modal',
  templateUrl: './hospital-photo-manager-modal.component.html',
  styleUrls: ['./hospital-photo-manager-modal.component.scss']
})
export class HospitalPhotoManagerModalComponent implements OnInit {

  private readonly photoUploadUrl = `${environment.apiUrl}/hospitals/{hospitalId}/photos`;

  @Input() hospitalId: string;
  @Input() rowData: TableRow;
  @Output() uploadSucceed = new EventEmitter();
  @Output() uploadFailed = new EventEmitter();
  @Output() closed = new EventEmitter();

  @ViewChild(NgxGalleryComponent) gallery: NgxGalleryComponent;

  hospital: Hospital;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  uploadUrl: string;

  constructor(
    public modalRef: MDBModalRef,
    private hospitalService: HospitalService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.uploadUrl = UrlUtils.resolvePathVariables(this.photoUploadUrl, {
      hospitalId: this.hospitalId
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

    this.getHospital();
  }

  private getHospital(goToLastPhoto: boolean = false) {
    this.hospitalService.getHospital(this.hospitalId)
      .subscribe((hospital: Hospital) => {
        this.hospital = hospital;
        this.galleryImages = hospital.photos.map(photo => {
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
    const photoId = this.hospital.photos[selectedIndex]._id;
    this.hospitalService.deleteHospitalPhoto(this.hospitalId, photoId)
      .subscribe(
        (hospital: Hospital) => {
          this.alertService.success('common.alert.deletePhotoSuccess');
          this.hospital.photos = this.hospital.photos
            .filter(photo => photo._id !== photoId);
          this.galleryImages = this.galleryImages
            .filter(image => this.galleryImages.indexOf(image) !== selectedIndex);

          if (selectedIndex - 1 >= 0) {
            this.gallery.show(selectedIndex - 1);
          }
        },
        error => this.alertService.error('common.alert.deletePhotoFailed'));
  }

  onUploadSucceed(hospital: Hospital) {
    this.uploadSucceed.emit(hospital);
    this.alertService.success('common.alert.uploadPhotoSuccess');
    this.getHospital(true);
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
