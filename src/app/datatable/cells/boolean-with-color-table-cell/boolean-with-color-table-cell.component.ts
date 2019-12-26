import { Component } from '@angular/core';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-boolean-with-color-table-cell',
  templateUrl: './boolean-with-color-table-cell.component.html',
  styleUrls: ['./boolean-with-color-table-cell.component.scss']
})
export class BooleanWithColorTableCellComponent extends AbstractTableCellComponent {

  constructor() {
    super();
  }

  updateValue() {
  }

}
