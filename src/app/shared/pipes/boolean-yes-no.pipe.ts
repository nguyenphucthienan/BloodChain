import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'booleanYesNo'
})
export class BooleanYesNoPipe implements PipeTransform {

  constructor(private translate: TranslateService) { }

  transform(value: any, args?: any): any {
    if (value === undefined || value === null) {
      return of(null);
    }

    return this.translate.get([
      'common.label.yes',
      'common.label.no'
    ]).pipe(
      map(translations => {
        const yes = translations['common.label.yes'];
        const no = translations['common.label.no'];
        return value ? yes : no;
      })
    );
  }

}
