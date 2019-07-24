import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProfileEditInfoComponent } from './components/profile-edit-info/profile-edit-info.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileEditInfoComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
