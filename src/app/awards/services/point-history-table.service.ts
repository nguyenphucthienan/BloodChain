import { Injectable } from '@angular/core';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCell } from 'src/app/datatable/models/table-cell.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class PointHistoryTableService implements TableService {

  columns: TableColumn[] = [
    { name: 'updatedAt', text: 'awardManager.column.updatedAt', type: 'DateTimeTableCellComponent' },
    { name: 'updatePointType', text: 'awardManager.column.updatePointType', type: 'TextTableCellComponent' },
    { name: 'amount', text: 'awardManager.column.amount', type: 'TextTableCellComponent' },
    { name: 'description', text: 'awardManager.column.description', type: 'TextTableCellComponent' },
    { name: 'actions', text: 'common.column.actions', type: 'ActionsTableCellComponent', center: true }
  ];

  rows: TableRow[];

  pagination: Pagination = {
    page: 1,
    size: 10
  };

  actions: TableAction[] = [
    { class: 'btn-info', icon: 'fa fa-info-circle', text: 'common.tooltip.detail', type: TableActionType.GetDetail }
  ];

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    return this.authService
      .getMyPointHistoriesOnBlockchain()
      .toPromise();
  }

  async getDataRows() {
    return await this.getRawData()
      .then((data: any[]) => {
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
