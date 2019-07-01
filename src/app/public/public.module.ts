import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './components/landing/landing.component';

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ]
})
export class PublicModule { }
