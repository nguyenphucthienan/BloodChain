import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-upload-photo-modal',
  templateUrl: './profile-upload-photo-modal.component.html',
  styleUrls: ['./profile-upload-photo-modal.component.scss']
})
export class ProfileUploadPhotoModalComponent implements OnInit {

  readonly uploadUrl = `${environment.apiUrl}/auth/me/photos`;

  @Output() uploadSucceed = new EventEmitter();
  @Output() uploadFailed = new EventEmitter();
  @Output() closed = new EventEmitter();

  constructor(
    public modalRef: MDBModalRef,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  onUploadSucceed(user: User) {
    this.uploadSucceed.emit(user);
    this.alertService.success('editUserInfo.alert.changePhotoSuccess');
  }

  onUploadFailed() {
    this.uploadFailed.emit();
    this.alertService.error('editUserInfo.alert.changePhotoFailed');
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}
