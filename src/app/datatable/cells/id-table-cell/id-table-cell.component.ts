import { Component } from '@angular/core';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-id-table-cell',
  templateUrl: './id-table-cell.component.html',
  styleUrls: ['./id-table-cell.component.scss']
})
export class IdTableCellComponent extends AbstractTableCellComponent {

  id: string;

  constructor() {
    super();
  }

  updateValue() {
    this.id = this.cell && this.cell.value.substr(-4);
  }

}
