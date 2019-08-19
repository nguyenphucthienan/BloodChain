import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodSeparationCenterService } from 'src/app/core/services/blood-separation-center.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-separation-center-delete-modal',
  templateUrl: './blood-separation-center-delete-modal.component.html',
  styleUrls: ['./blood-separation-center-delete-modal.component.scss']
})
export class BloodSeparationCenterDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() bloodSeparationCenterDeleted = new EventEmitter();

  bloodSeparationCenterName: string;

  constructor(
    public modalRef: MDBModalRef,
    private bloodSeparationCenterService: BloodSeparationCenterService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.bloodSeparationCenterName = this.rowData.cells.name.value;
  }

  deleteBloodSeparationCenter() {
    this.bloodSeparationCenterService.deleteBloodSeparationCenter(this.rowData.cells._id.value)
      .subscribe(
        () => {
          this.bloodSeparationCenterDeleted.emit();
          this.alertService.success('bloodSeparationCenterManager.alert.deleteSuccess');
        },
        error => this.alertService.error('bloodSeparationCenterManager.alert.deleteFailed')
      );
  }

}
