import { TableCell } from './table-cell.interface';
import { TableColumn } from './table-column.interface';
import { TableRow } from './table-row.interface';

export interface TableCellChange {
  column: TableColumn;
  row: TableRow;
  cell: TableCell;
  oldValue: any;
  newValue: any;
}
