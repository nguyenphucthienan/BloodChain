import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SortMode } from '../core/models/sort-mode.interface';
import { TableUtils } from '../utils/table-utils';
import { TableColumn } from './models/table-column.interface';
import { TableRow } from './models/table-row.interface';
import { TableRowSelectTrackingService } from './services/table-row-select-tracking.service';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  @Input() tableService: TableService;
  @Input() selectableRow: boolean;

  @Output() cellChanged = new EventEmitter<any>();

  columns: TableColumn[] = [];
  rows: TableRow[] = [];
  selectAllOnPage: boolean;

  constructor(private tableRowSelectTrackingService: TableRowSelectTrackingService) { }

  async ngOnInit() {
    this.columns = this.tableService.getDataColumns();
    await this.getTableData();
  }

  private async getTableData() {
    this.rows = await this.tableService.getDataRows();
    this.recheckSelectRows(this.rows);
    this.checkSelectAllOnPage();
  }

  async refresh() {
    await this.getTableData();
  }

  onPageChanged(page: number) {
    this.tableService.pagination.page = page;
    this.getTableData();
  }

  onCellChanged(event: any) {
    this.cellChanged.emit(event);
  }

  selectAllHeader(checked: boolean) {
    this.selectAllOnPage = checked;
    this.rows.forEach(row => {
      row.selected = checked;
      this.tableRowSelectTrackingService.setStateId(row.cells.id.value, row.selected);
    });
  }

  selectRow(checked: boolean, row: TableRow) {
    row.selected = checked;
    this.tableRowSelectTrackingService.setStateId(row.cells.id.value, row.selected);
    this.checkSelectAllOnPage();
  }

  private recheckSelectRows(rows: TableRow[]) {
    if (this.selectableRow) {
      rows.forEach(row =>
        row.selected = this.tableRowSelectTrackingService.getStateId(row.cells.id.value)
      );
    }
  }

  private checkSelectAllOnPage() {
    if (this.selectableRow) {
      this.selectAllOnPage = this.rows
        .every(row => this.tableRowSelectTrackingService.getStateId(row.cells.id.value));
    }
  }

  getHeaderIconClass(column: TableColumn) {
    const sortMode: SortMode = this.tableService.sortMode;
    return TableUtils.getHeaderIconClass(sortMode, column);
  }

  changeSortMode(column: TableColumn) {
    if (!column.sortable) {
      return;
    }

    const sortMode: SortMode = this.tableService.sortMode;

    if (sortMode.sortBy === column.name) {
      sortMode.isSortAscending = !sortMode.isSortAscending;
    } else {
      sortMode.sortBy = column.name;
      sortMode.isSortAscending = true;
    }

    this.getTableData();
  }

}
