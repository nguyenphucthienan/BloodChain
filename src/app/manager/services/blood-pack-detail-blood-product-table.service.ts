import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodProductService } from 'src/app/core/services/blood-product.service';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCell } from 'src/app/datatable/models/table-cell.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class BloodPackDetailBloodProductTableService implements TableService {

  columns: TableColumn[] = [
    { name: '_id', text: 'common.column.id', type: 'IdTableCellComponent', center: true, sortable: true },
    { name: 'createdAt', text: 'bloodProductManager.column.createdAt', type: 'DateTimeTableCellComponent', sortable: true },
    { name: 'bloodProductType', text: 'bloodProductManager.column.bloodProductType', type: 'ObjectTextTableCellComponent', sortable: true },
    { name: 'bloodType', text: 'bloodPackManager.column.bloodType', type: 'TextTableCellComponent', sortable: true },
    { name: 'volume', text: 'bloodProductManager.column.volume', type: 'TextTableCellComponent', sortable: true },
    { name: 'expirationDate', text: 'bloodProductManager.column.expirationDate', type: 'DateTableCellComponent', sortable: true },
    { name: 'used', text: 'bloodProductManager.column.used', type: 'BooleanTableCellComponent', center: true, sortable: true },
    { name: 'actions', text: 'common.column.actions', type: 'ActionsTableCellComponent', center: true }
  ];

  rows: TableRow[];

  pagination: Pagination = {
    page: 1,
    size: 10
  };

  sortMode: SortMode = {
    sortBy: '_id',
    isSortAscending: false
  };

  filterMode: FilterMode = {};

  actions: TableAction[] = [
    { class: 'btn-info', icon: 'fa fa-info-circle', text: 'common.tooltip.detail', type: TableActionType.GetDetail }
  ];

  constructor(
    private bloodProductService: BloodProductService,
    private alertService: AlertService
  ) { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    if (this.filterMode.bloodPack) {
      return this.bloodProductService.getBloodProducts(
        this.pagination,
        this.sortMode,
        this.filterMode
      ).pipe(
        map((response: any) => {
          this.pagination = response.pagination;
          return response.items;
        })
      ).toPromise();
    } else {
      return Promise.resolve([]);
    }
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

            if (key === 'donor') {
              cells[key] = {
                value: row[key],
                textProperty: 'username'
              };
            } else if (key === 'bloodProductType'
              || key === 'bloodSeparationCenter') {
              cells[key] = {
                value: row[key],
                textProperty: 'name'
              };
            } else {
              cells[key] = {
                value: row[key]
              };
            }
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
