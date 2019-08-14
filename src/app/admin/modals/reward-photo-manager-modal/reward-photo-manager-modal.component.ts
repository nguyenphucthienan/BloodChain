import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NgxGalleryAnimation, NgxGalleryComponent, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { Reward } from 'src/app/core/models/reward.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { RewardService } from 'src/app/core/services/reward.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reward-photo-manager-modal',
  templateUrl: './reward-photo-manager-modal.component.html',
  styleUrls: ['./reward-photo-manager-modal.component.scss']
})
export class RewardPhotoManagerModalComponent implements OnInit {

  private readonly photoUploadUrl = `${environment.apiUrl}/rewards/{rewardId}/photos`;

  @Input() rewardId: string;
  @Input() rowData: TableRow;
  @Output() uploadSucceed = new EventEmitter();
  @Output() uploadFailed = new EventEmitter();
  @Output() closed = new EventEmitter();

  @ViewChild(NgxGalleryComponent) gallery: NgxGalleryComponent;

  reward: Reward;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  uploadUrl: string;

  constructor(
    public modalRef: MDBModalRef,
    private rewardService: RewardService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.uploadUrl = UrlUtils.resolvePathVariables(this.photoUploadUrl, {
      rewardId: this.rewardId
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

    this.getReward();
  }

  private getReward(goToLastPhoto: boolean = false) {
    this.rewardService.getReward(this.rewardId)
      .subscribe((reward: Reward) => {
        this.reward = reward;
        this.galleryImages = reward.photos.map(photo => {
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
    const photoId = this.reward.photos[selectedIndex]._id;
    this.rewardService.deleteRewardPhoto(this.rewardId, photoId)
      .subscribe(
        (reward: Reward) => {
          this.alertService.success('common.alert.deletePhotoSuccess');
          this.reward.photos = this.reward.photos
            .filter(photo => photo._id !== photoId);
          this.galleryImages = this.galleryImages
            .filter(image => this.galleryImages.indexOf(image) !== selectedIndex);

          if (selectedIndex - 1 >= 0) {
            this.gallery.show(selectedIndex - 1);
          }
        },
        error => this.alertService.error('common.alert.deletePhotoFailed'));
  }

  onUploadSucceed(reward: Reward) {
    this.uploadSucceed.emit(reward);
    this.alertService.success('common.alert.uploadPhotoSuccess');
    this.getReward(true);
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
