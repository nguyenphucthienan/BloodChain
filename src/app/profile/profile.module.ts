import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProfileEditInfoComponent } from './components/profile-edit-info/profile-edit-info.component';
import { ProfileUploadPhotoModalComponent } from './modals/profile-upload-photo-modal/profile-upload-photo-modal.component';
import { ProfileUserQrcodeModalComponent } from './modals/profile-user-qrcode-modal/profile-user-qrcode-modal.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileEditInfoComponent,
    ProfileUserQrcodeModalComponent,
    ProfileUploadPhotoModalComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  entryComponents: [
    ProfileUserQrcodeModalComponent,
    ProfileUploadPhotoModalComponent
  ]
})
export class ProfileModule { }
