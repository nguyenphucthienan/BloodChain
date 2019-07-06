import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProfileEditInfoComponent } from './components/profile-edit-info/profile-edit-info.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ProfileEditInfoComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
