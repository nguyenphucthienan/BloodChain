import { Component } from '@angular/core';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-text-table-cell',
  templateUrl: './text-table-cell.component.html',
  styleUrls: ['./text-table-cell.component.scss']
})
export class TextTableCellComponent extends AbstractTableCellComponent {

  bold: boolean;
  text: string;

  constructor() {
    super();
  }

  updateValue() {
    if (this.cell) {
      this.bold = this.cell.bold;
      this.text = this.cell.value;
    }
  }

}
