import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TableCellChange } from '../../models/table-cell-change.interface';
import { TableCell } from '../../models/table-cell.interface';
import { TableColumn } from '../../models/table-column.interface';
import { TableRow } from '../../models/table-row.interface';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit {

  @Input() column: TableColumn;
  @Input() row: TableRow;
  @Input() cell: TableCell;
  @Input() cellType: any;

  @Output() cellChanged = new EventEmitter<TableCellChange>();

  constructor() { }

  ngOnInit() {
  }

}
