import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from 'src/app/core/services/alert.service';
import { HospitalService } from 'src/app/core/services/hospital.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-hospital-delete-modal',
  templateUrl: './hospital-delete-modal.component.html',
  styleUrls: ['./hospital-delete-modal.component.scss']
})
export class HospitalDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() hospitalDeleted = new EventEmitter();

  hospitalName: string;

  constructor(
    public modalRef: MDBModalRef,
    private hospitalService: HospitalService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.hospitalName = this.rowData.cells.name.value;
  }

  deleteHospital() {
    this.hospitalService.deleteHospital(this.rowData.cells._id.value)
      .subscribe(
        () => {
          this.hospitalDeleted.emit();
          this.alertService.success('hospitalManager.alert.deleteSuccess');
        },
        error => this.alertService.success('hospitalManager.alert.deleteFailed')
      );
  }

}
