import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';

import {
  BloodPackUpdateSeparationResultResultTableService,
} from '../../services/blood-pack-update-separation-result-result-table.service';

@Component({
  selector: 'app-blood-pack-update-separation-result-result-modal',
  templateUrl: './blood-pack-update-separation-result-result-modal.component.html',
  styleUrls: ['./blood-pack-update-separation-result-result-modal.component.scss'],
  providers: [BloodPackUpdateSeparationResultResultTableService]
})
export class BloodPackUpdateSeparationResultResultModalComponent implements OnInit {

  @Input() bloodPack: BloodPack;

  @Output() closed = new EventEmitter();

  constructor(
    public bloodPackUpdateSeparationResultResultTableService: BloodPackUpdateSeparationResultResultTableService,
    public modalRef: MDBModalRef
  ) { }

  ngOnInit() {
    this.bloodPackUpdateSeparationResultResultTableService.filterMode.bloodPack = this.bloodPack._id;
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodPackDetail(tableCellChange.row.cells._id.value);
        break;
    }
  }

  navigateToBloodPackDetail(id: string) {
  }

}
