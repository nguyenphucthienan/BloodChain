import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NgxGalleryAnimation, NgxGalleryComponent, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { BloodBank } from 'src/app/core/models/blood-bank.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodBankService } from 'src/app/core/services/blood-bank.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blood-bank-photo-manager-modal',
  templateUrl: './blood-bank-photo-manager-modal.component.html',
  styleUrls: ['./blood-bank-photo-manager-modal.component.scss']
})
export class BloodBankPhotoManagerModalComponent implements OnInit {

  private readonly photoUploadUrl = `${environment.apiUrl}/blood-banks/{bloodBankId}/photos`;

  @Input() bloodBankId: string;
  @Input() rowData: TableRow;
  @Output() uploadSucceed = new EventEmitter();
  @Output() uploadFailed = new EventEmitter();
  @Output() closed = new EventEmitter();

  @ViewChild(NgxGalleryComponent) gallery: NgxGalleryComponent;

  bloodBank: BloodBank;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  uploadUrl: string;

  constructor(
    public modalRef: MDBModalRef,
    private bloodBankService: BloodBankService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.uploadUrl = UrlUtils.resolvePathVariables(this.photoUploadUrl, {
      bloodBankId: this.bloodBankId
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

    this.getBloodBank();
  }

  private getBloodBank(goToLastPhoto: boolean = false) {
    this.bloodBankService.getBloodBank(this.bloodBankId)
      .subscribe((bloodBank: BloodBank) => {
        this.bloodBank = bloodBank;
        this.galleryImages = bloodBank.photos.map(photo => {
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
    const photoId = this.bloodBank.photos[selectedIndex]._id;
    this.bloodBankService.deleteBloodBankPhoto(this.bloodBankId, photoId)
      .subscribe(
        (bloodBank: BloodBank) => {
          this.alertService.success('common.alert.deletePhotoSuccess');
          this.bloodBank.photos = this.bloodBank.photos
            .filter(photo => photo._id !== photoId);
          this.galleryImages = this.galleryImages
            .filter(image => this.galleryImages.indexOf(image) !== selectedIndex);

          if (selectedIndex - 1 >= 0) {
            this.gallery.show(selectedIndex - 1);
          }
        },
        error => this.alertService.error('common.alert.deletePhotoFailed'));
  }

  onUploadSucceed(bloodBank: BloodBank) {
    this.uploadSucceed.emit(bloodBank);
    this.alertService.success('common.alert.uploadPhotoSuccess');
    this.getBloodBank(true);
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
