import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';

import { BloodCampManagerTableService } from '../../services/blood-camp-manager-table.service';

@Component({
  selector: 'app-admin-blood-camp-manager',
  templateUrl: './admin-blood-camp-manager.component.html',
  styleUrls: ['./admin-blood-camp-manager.component.scss'],
  providers: [BloodCampManagerTableService]
})
export class AdminBloodCampManagerComponent implements OnInit {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  constructor(public bloodCampManagerTableService: BloodCampManagerTableService) { }

  ngOnInit() {
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodCampDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Delete:
        this.openDeleteBloodCampModal(tableCellChange.row.cells._id.value);
        break;
    }
  }

  navigateToBloodCampDetail(id: string) {
  }

  openDeleteBloodCampModal(id: string) {
  }

}
