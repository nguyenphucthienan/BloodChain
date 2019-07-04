import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AlertService {

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  success(message: string, title: string = 'common.alert.success') {
    this.translate.get([message, title])
      .subscribe(result => this.toastr.success(result[message], result[title]));
  }

  error(message: string, title: string = 'common.alert.error') {
    this.translate.get([message, title])
      .subscribe(result => this.toastr.error(result[message], result[title]));
  }

  info(message: string, title: string = 'common.alert.info') {
    this.translate.get([message, title])
      .subscribe(result => this.toastr.info(result[message], result[title]));
  }

  warning(message: string, title: string = 'common.alert.warning') {
    this.translate.get([message, title])
      .subscribe(result => this.toastr.warning(result[message], result[title]));
  }

}
