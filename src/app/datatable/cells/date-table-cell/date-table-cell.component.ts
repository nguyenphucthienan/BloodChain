import { Component } from '@angular/core';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-date-table-cell',
  templateUrl: './date-table-cell.component.html',
  styleUrls: ['./date-table-cell.component.scss']
})
export class DateTableCellComponent extends AbstractTableCellComponent {

  constructor() {
    super();
  }

  updateValue() {
  }

}
