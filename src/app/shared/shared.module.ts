import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SidebarModule } from 'ng-sidebar';
import { environment } from 'src/environments/environment';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from './components/header/header.component';
import { MapInputComponent } from './components/map-input/map-input.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    PaginationComponent,
    MapInputComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MDBBootstrapModule.forRoot(),
    SidebarModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey,
      libraries: ['places']
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot().ngModule,
    SidebarModule.forRoot().ngModule,
    TranslateModule.forRoot().ngModule,
    AgmCoreModule.forRoot().ngModule,
    HeaderComponent,
    SidebarComponent,
    PaginationComponent,
    MapInputComponent,
    BreadcrumbComponent
  ],
})
export class SharedModule { }
