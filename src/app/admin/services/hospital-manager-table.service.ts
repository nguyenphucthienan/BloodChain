import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { HospitalService } from 'src/app/core/services/hospital.service';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCell } from 'src/app/datatable/models/table-cell.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class HospitalManagerTableService implements TableService {

  columns: TableColumn[] = [
    { name: '_id', text: 'common.column.id', type: 'IdTableCellComponent', center: true, sortable: true },
    { name: 'name', text: 'common.column.name', type: 'TextTableCellComponent', sortable: true },
    { name: 'address', text: 'common.column.address', type: 'TextTableCellComponent', sortable: true },
    { name: 'email', text: 'common.column.email', type: 'TextTableCellComponent', sortable: true },
    { name: 'phone', text: 'common.column.phone', type: 'TextTableCellComponent', sortable: true },
    { name: 'actions', text: 'common.column.actions', type: 'ActionsTableCellComponent', center: true }
  ];

  rows: TableRow[];

  pagination: Pagination = {
    page: 1,
    size: 10
  };

  sortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  filterMode: FilterMode = {};

  actions: TableAction[] = [
    { class: 'btn-info', icon: 'fa fa-info-circle', text: 'common.tooltip.detail', type: TableActionType.GetDetail },
    { class: 'btn-dark', icon: 'fa fa-user-tag', text: 'common.tooltip.assign', type: TableActionType.Assign },
    { class: 'btn-dark', icon: 'fa fa-image', text: 'common.tooltip.managePhotos', type: TableActionType.ManagePhotos },
    { class: 'btn-dark', icon: 'fa fa-edit', text: 'common.tooltip.update', type: TableActionType.Update },
    { class: 'btn-danger', icon: 'fa fa-trash-alt', text: 'common.tooltip.delete', type: TableActionType.Delete }
  ];

  constructor(
    private hospitalService: HospitalService,
    private alertService: AlertService
  ) { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    return this.hospitalService.getHospitals(
      this.pagination,
      this.sortMode,
      this.filterMode
    ).pipe(
      map((response: any) => {
        this.pagination = response.pagination;
        return response.items;
      })
    ).toPromise();
  }

  async getDataRows() {
    return await this.getRawData()
      .then(data => {
        this.rows = data.map(row => {
          const cells: TableCell = {} as any;

          for (const key in row) {
            if (!row.hasOwnProperty(key)) {
              continue;
            }

            cells[key] = {
              value: row[key]
            };
          }

          cells.actions = {
            value: this.actions,
            showText: false
          };

          return { cells };
        });

        return this.rows;
      })
      .catch(error => this.alertService.error('common.alert.getDataFailed'));
  }

}
