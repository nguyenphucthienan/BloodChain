import { EventEmitter, Input, OnInit } from '@angular/core';

import { TableCellChange } from '../../models/table-cell-change.interface';
import { TableCell } from '../../models/table-cell.interface';
import { TableColumn } from '../../models/table-column.interface';
import { TableRow } from '../../models/table-row.interface';

export abstract class AbstractTableCellComponent implements OnInit {

  @Input() column?: TableColumn;
  @Input() row?: TableRow;
  @Input() cell: TableCell;

  @Input() cellChanged = new EventEmitter<TableCellChange>();

  constructor() { }

  ngOnInit() {
    this.updateValue();
  }

  abstract updateValue();

  onChange(newValue) {
    this.cellChanged.emit({
      cell: this.cell,
      row: this.row,
      column: this.column,
      oldValue: this.cell.value,
      newValue
    });
  }

}
