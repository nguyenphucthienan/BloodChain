import { Component } from '@angular/core';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-date-time-table-cell',
  templateUrl: './date-time-table-cell.component.html',
  styleUrls: ['./date-time-table-cell.component.scss']
})
export class DateTimeTableCellComponent extends AbstractTableCellComponent {

  constructor() {
    super();
  }

  updateValue() {
  }

}
