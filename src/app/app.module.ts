import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BloodCampModule } from './blood-camp/blood-camp.module';
import { BloodSeparationCenterModule } from './blood-separation-center/blood-separation-center.module';
import { BloodTestCenterModule } from './blood-test-center/blood-test-center.module';
import { CoreModule } from './core/core.module';
import { DonationHistoryModule } from './donation-history/donation-history.module';
import { ManagerModule } from './manager/manager.module';
import { ProfileModule } from './profile/profile.module';
import { PublicModule } from './public/public.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    PublicModule,
    AdminModule,
    ManagerModule,
    ProfileModule,
    DonationHistoryModule,
    BloodCampModule,
    BloodTestCenterModule,
    BloodSeparationCenterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
