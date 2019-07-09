import { Injectable } from '@angular/core';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class BloodCampBloodPackTransferTableService implements TableService {

  columns: TableColumn[] = [
    { name: '_id', text: 'common.column.id', type: 'IdTableCellComponent', center: true, sortable: true },
    { name: 'donor', text: 'bloodPackManager.column.donor', type: 'ObjectTextTableCellComponent', sortable: true },
    { name: 'volume', text: 'bloodPackManager.column.volume', type: 'TextTableCellComponent', sortable: true },
    { name: 'createdAt', text: 'bloodPackManager.column.createdAt', type: 'DateTimeTableCellComponent', sortable: true },
    { name: 'actions', text: 'common.column.actions', type: 'ActionsTableCellComponent', center: true }
  ];

  rows: TableRow[] = [];

  pagination: Pagination = {
    page: 1,
    size: 8
  };

  sortMode: SortMode = {
    sortBy: '_id',
    isSortAscending: false
  };

  filterMode: FilterMode = {};

  actions: TableAction[] = [
    { class: 'btn-info', icon: 'fa fa-info-circle', text: 'common.tooltip.detail', type: TableActionType.GetDetail }
  ];

  constructor() { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    throw new Error('Not implemented');
  }

  setDataRows(rows: TableRow[]) {
    this.rows = rows;
    this.calculatePagination();
  }

  getDataRows() {
    const { page, size } = this.pagination;
    const { sortBy, isSortAscending } = this.sortMode;
    const from = (page - 1) * size;
    const to = from + size;
    return this.rows
      .sort((a, b) => a.cells[sortBy].value > b.cells[sortBy].value === isSortAscending ? 1 : -1)
      .slice(from, to);
  }

  private calculatePagination() {
    this.pagination.totalItems = this.rows.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.size);
  }

}
