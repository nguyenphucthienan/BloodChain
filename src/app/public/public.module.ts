import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ]
})
export class PublicModule { }
