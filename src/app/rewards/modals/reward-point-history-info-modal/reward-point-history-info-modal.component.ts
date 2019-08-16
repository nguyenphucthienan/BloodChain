import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { UpdatePointDescriptionType } from 'src/app/core/constant/update-point-description-type';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-reward-point-history-info-modal',
  templateUrl: './reward-point-history-info-modal.component.html',
  styleUrls: ['./reward-point-history-info-modal.component.scss']
})
export class RewardPointHistoryInfoModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() closed = new EventEmitter();

  info: any;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    switch (this.rowData.cells.descriptionType.value) {
      case UpdatePointDescriptionType.DONATE_BLOOD:
        this.info = {
          bloodPackId: this.rowData.cells.bloodPackId.value
        };
        break;
      case UpdatePointDescriptionType.REDEEM_VOUCHER:
        this.info = {
          rewardId: this.rowData.cells.rewardId.value,
          rewardName: this.rowData.cells.rewardName.value,
          code: this.rowData.cells.code.value,
        };
        break;
      case UpdatePointDescriptionType.REDEEM_ETHEREUM:
        this.info = {
          ethAddress: this.rowData.cells.ethAddress.value,
          ethAmount: this.rowData.cells.ethAmount.value,
          transactionId: this.rowData.cells.transactionId.value,
        };
        break;
    }
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}
