import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodTestCenterService } from 'src/app/core/services/blood-test-center.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-test-center-delete-modal',
  templateUrl: './blood-test-center-delete-modal.component.html',
  styleUrls: ['./blood-test-center-delete-modal.component.scss']
})
export class BloodTestCenterDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() bloodTestCenterDeleted = new EventEmitter();

  bloodTestCenterName: string;

  constructor(
    public modalRef: MDBModalRef,
    private bloodTestCenterService: BloodTestCenterService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.bloodTestCenterName = this.rowData.cells.name.value;
  }

  deleteBloodTestCenter() {
    this.bloodTestCenterService.deleteBloodTestCenter(this.rowData.cells._id.value)
      .subscribe(
        () => {
          this.bloodTestCenterDeleted.emit();
          this.alertService.success('bloodTestCenterManager.alert.deleteSuccess');
        },
        error => this.alertService.error('bloodTestCenterManager.alert.deleteFailed')
      );
  }

}
