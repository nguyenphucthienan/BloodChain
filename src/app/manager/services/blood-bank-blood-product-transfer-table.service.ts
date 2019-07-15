import { Injectable } from '@angular/core';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCell } from 'src/app/datatable/models/table-cell.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class BloodBankBloodProductTransferTableService implements TableService {

  columns: TableColumn[] = [
    { name: '_id', text: 'common.column.id', type: 'IdTableCellComponent', center: true, sortable: true },
    { name: 'bloodProductType', text: 'bloodProductManager.column.bloodProductType', type: 'ObjectTextTableCellComponent', sortable: true },
    { name: 'bloodType', text: 'bloodPackManager.column.bloodType', type: 'TextTableCellComponent', sortable: true },
    { name: 'volume', text: 'bloodProductManager.column.volume', type: 'TextTableCellComponent', sortable: true },
    { name: 'expirationDate', text: 'bloodProductManager.column.expirationDate', type: 'DateTableCellComponent', sortable: true },
    { name: 'actions', text: 'common.column.actions', type: 'ActionsTableCellComponent', center: true }
  ];

  rows: TableRow[] = [];

  pagination: Pagination = {
    page: 1,
    size: 5,
    totalItems: 0,
    totalPages: 0
  };

  sortMode: SortMode = {
    sortBy: '_id',
    isSortAscending: false
  };

  filterMode: FilterMode = {};

  actions: TableAction[] = [
    { class: 'btn-info', icon: 'fa fa-info-circle', text: 'common.tooltip.detail', type: TableActionType.GetDetail },
    { class: 'btn-danger', icon: 'fa fa-times', text: 'common.tooltip.delete', type: TableActionType.Delete }
  ];

  constructor(private alertService: AlertService) { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    throw new Error('Not implemented');
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

  setDataRows(rows: TableRow[]) {
    this.rows = [...rows];
    this.rows.forEach(row => {
      row.cells.actions = {
        value: this.actions,
        showText: false
      };
    });

    this.calculatePagination();
  }

  addRawDataRow(rawDataRow: any) {
    const existingIds = this.rows.map(row => row.cells._id.value);
    if (existingIds.includes(rawDataRow._id)) {
      this.alertService.error('bloodProductManager.alert.alreadySelected');
      return;
    }

    const cells: TableCell = {} as any;
    for (const key in rawDataRow) {
      if (!rawDataRow.hasOwnProperty(key)) {
        continue;
      }

      if (key === 'donor') {
        cells[key] = {
          value: rawDataRow[key],
          textProperty: 'username'
        };
      } else {
        cells[key] = {
          value: rawDataRow[key]
        };
      }
    }

    cells.actions = {
      value: this.actions,
      showText: false
    };

    const newRow = { cells };
    this.rows.push(newRow);
    this.calculatePagination();
  }

  removeDataRow(id: string) {
    this.rows = this.rows.filter(row => row.cells._id.value !== id);
    this.calculatePagination();
  }

  removeAllDataRows() {
    this.setDataRows([]);
  }

  getAllRowIds() {
    return this.rows.map(row => row.cells._id.value);
  }

  private calculatePagination() {
    this.pagination.totalItems = this.rows.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.size);
  }

}
