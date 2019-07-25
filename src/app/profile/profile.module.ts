import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileDonationHistoryComponent } from './components/profile-donation-history/profile-donation-history.component';
import { ProfileEditInfoComponent } from './components/profile-edit-info/profile-edit-info.component';
import { ProfileUserQrcodeModalComponent } from './modals/profile-user-qrcode-modal/profile-user-qrcode-modal.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileEditInfoComponent,
    ProfileUserQrcodeModalComponent,
    ProfileDonationHistoryComponent
  ],
  imports: [
    SharedModule,
    DatatableModule,
    ProfileRoutingModule
  ],
  entryComponents: [
    ProfileUserQrcodeModalComponent
  ]
})
export class ProfileModule { }
