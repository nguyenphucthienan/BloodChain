import { Component } from '@angular/core';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-boolean-two-values-table-cell',
  templateUrl: './boolean-two-values-table-cell.component.html',
  styleUrls: ['./boolean-two-values-table-cell.component.scss']
})
export class BooleanTwoValuesTableCellComponent extends AbstractTableCellComponent {

  constructor() {
    super();
  }

  updateValue() {
  }

}
