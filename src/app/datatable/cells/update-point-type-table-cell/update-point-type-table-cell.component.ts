import { Component } from '@angular/core';

import { TableAction } from '../../models/table-action.interface';
import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-update-point-type-table-cell',
  templateUrl: './update-point-type-table-cell.component.html',
  styleUrls: ['./update-point-type-table-cell.component.scss']
})
export class UpdatePointTypeTableCellComponent extends AbstractTableCellComponent {

  updatePointType: number;

  constructor() {
    super();
  }

  updateValue() {
    this.updatePointType = this.cell && this.cell.value;
  }

  onActionClicked(action: TableAction) {
    this.onChange(action);
  }

}
