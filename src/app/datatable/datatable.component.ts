import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

import { SortMode } from '../core/models/sort-mode.interface';
import { TableUtils } from '../utils/table-utils';
import { TableColumn } from './models/table-column.interface';
import { TableRow } from './models/table-row.interface';
import { TableRowSelectTrackingService } from './services/table-row-select-tracking.service';
import { TableService } from './services/table.service';

declare const $: any;

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  @Input() tableName: string;
  @Input() tableService: TableService;
  @Input() selectableRow: boolean;

  @Output() cellChanged = new EventEmitter<any>();

  columns: TableColumn[] = [];
  rows: TableRow[] = [];
  selectAllOnPage: boolean;

  start: any;
  pressed: boolean;
  startX: number;
  startWidth: number;

  constructor(
    private tableRowSelectTrackingService: TableRowSelectTrackingService,
    public renderer: Renderer2
  ) { }

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

  onMouseDown(event: any) {
    this.start = event.target;
    this.pressed = true;
    this.startX = event.x;
    this.startWidth = $(this.start).parent().width();
    this.resizeColumns();
  }

  private resizeColumns() {
    this.renderer.listen('body', 'mousemove', (event) => {
      if (this.pressed) {
        const width = this.startWidth + (event.clientX - this.startX);
        $(this.start).parent().css({ 'min-width': width, 'max-width': width });
        const index = $(this.start).parent().index() + 1;
        $('.table tr td:nth-child(' + index + ')').css({ 'min-width': width, 'max-width': width });
      }
    });

    this.renderer.listen('body', 'mouseup', (event) => {
      if (this.pressed) {
        this.pressed = false;
      }
    });
  }

}
