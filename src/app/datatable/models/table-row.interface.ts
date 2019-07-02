import { TableCell } from './table-cell.interface';

export interface TableRow {
  cells: { [name: string]: TableCell };
  selected?: boolean;
}
