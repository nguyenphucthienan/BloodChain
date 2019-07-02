import { Component } from '@angular/core';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-piped-text-table-cell',
  templateUrl: './piped-text-table-cell.component.html',
  styleUrls: ['./piped-text-table-cell.component.scss']
})
export class PipedTextTableCellComponent extends AbstractTableCellComponent {

  pipe: any;
  text: string;

  constructor() {
    super();
  }

  updateValue() {
    if (this.cell) {
      this.pipe = this.cell.pipe;
      this.text = this.pipe.transform(this.cell.value);
    }
  }

}
