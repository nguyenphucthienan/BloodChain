import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodBankService } from 'src/app/core/services/blood-bank.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-bank-delete-modal',
  templateUrl: './blood-bank-delete-modal.component.html',
  styleUrls: ['./blood-bank-delete-modal.component.scss']
})
export class BloodBankDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() bloodBankDeleted = new EventEmitter();

  bloodBankName: string;

  constructor(
    public modalRef: MDBModalRef,
    private bloodBankService: BloodBankService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.bloodBankName = this.rowData.cells.name.value;
  }

  deleteBloodBank() {
    this.bloodBankService.deleteBloodBank(this.rowData.cells._id.value)
      .subscribe(
        () => {
          this.bloodBankDeleted.emit();
          this.alertService.success('bloodBankManager.alert.deleteSuccess');
        },
        error => this.alertService.success('bloodBankManager.alert.deleteFailed')
      );
  }

}
