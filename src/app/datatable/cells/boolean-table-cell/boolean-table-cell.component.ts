import { Component } from '@angular/core';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-boolean-table-cell',
  templateUrl: './boolean-table-cell.component.html',
  styleUrls: ['./boolean-table-cell.component.scss']
})
export class BooleanTableCellComponent extends AbstractTableCellComponent {

  constructor() {
    super();
  }

  updateValue() {
  }

}
