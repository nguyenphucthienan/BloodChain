import { Component } from '@angular/core';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-image-table-cell',
  templateUrl: './image-table-cell.component.html',
  styleUrls: ['./image-table-cell.component.scss']
})
export class ImageTableCellComponent extends AbstractTableCellComponent {

  maxHeight = 40;

  constructor() {
    super();
  }

  updateValue() {
    if (this.cell && this.cell.maxHeight) {
      this.maxHeight = this.cell.maxHeight;
    }
  }

}
