import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';

import { TableColumn } from '../models/table-column.interface';
import { TableRow } from '../models/table-row.interface';

export interface TableService {

  columns: TableColumn[];
  rows: TableRow[];

  pagination: Pagination;
  sortMode?: SortMode;
  filterMode?: FilterMode;

  getDataColumns();

  getRawData();

  getDataRows();

}
