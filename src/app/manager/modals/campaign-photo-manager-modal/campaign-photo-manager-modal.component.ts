import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NgxGalleryAnimation, NgxGalleryComponent, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { Campaign } from 'src/app/core/models/campaign.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campaign-photo-manager-modal',
  templateUrl: './campaign-photo-manager-modal.component.html',
  styleUrls: ['./campaign-photo-manager-modal.component.scss']
})
export class CampaignPhotoManagerModalComponent implements OnInit {

  private readonly photoUploadUrl = `${environment.apiUrl}/campaigns/{campaignId}/photos`;

  @Input() campaignId: string;
  @Input() rowData: TableRow;
  @Output() uploadSucceed = new EventEmitter();
  @Output() uploadFailed = new EventEmitter();
  @Output() closed = new EventEmitter();

  @ViewChild(NgxGalleryComponent) gallery: NgxGalleryComponent;

  campaign: Campaign;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  uploadUrl: string;

  constructor(
    public modalRef: MDBModalRef,
    private campaignService: CampaignService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.uploadUrl = UrlUtils.resolvePathVariables(this.photoUploadUrl, {
      campaignId: this.campaignId
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

    this.getCampaign();
  }

  private getCampaign(goToLastPhoto: boolean = false) {
    this.campaignService.getCampaign(this.campaignId)
      .subscribe((campaign: Campaign) => {
        this.campaign = campaign;
        this.galleryImages = campaign.photos.map(photo => {
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
    const photoId = this.campaign.photos[selectedIndex]._id;
    this.campaignService.deleteCampaignPhoto(this.campaignId, photoId)
      .subscribe(
        (campaign: Campaign) => {
          this.alertService.success('common.alert.deletePhotoSuccess');
          this.campaign.photos = this.campaign.photos
            .filter(photo => photo._id !== photoId);
          this.galleryImages = this.galleryImages
            .filter(image => this.galleryImages.indexOf(image) !== selectedIndex);

          if (selectedIndex - 1 >= 0) {
            this.gallery.show(selectedIndex - 1);
          }
        },
        error => this.alertService.error('common.alert.deletePhotoFailed'));
  }

  onUploadSucceed(campaign: Campaign) {
    this.uploadSucceed.emit(campaign);
    this.alertService.success('common.alert.uploadPhotoSuccess');
    this.getCampaign(true);
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
