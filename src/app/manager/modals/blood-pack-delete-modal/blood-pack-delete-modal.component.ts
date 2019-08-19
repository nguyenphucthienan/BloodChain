import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-pack-delete-modal',
  templateUrl: './blood-pack-delete-modal.component.html',
  styleUrls: ['./blood-pack-delete-modal.component.scss']
})
export class BloodPackDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() bloodPackDeleted = new EventEmitter();

  bloodPackId: string;

  constructor(
    public modalRef: MDBModalRef,
    private bloodPackService: BloodPackService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.bloodPackId = this.rowData.cells._id.value;
  }

  deleteBloodPack() {
    this.bloodPackService.deleteBloodPack(this.rowData.cells._id.value)
      .subscribe(
        () => {
          this.bloodPackDeleted.emit();
          this.alertService.success('bloodPackManager.alert.deleteSuccess');
        },
        error => this.alertService.error('bloodPackManager.alert.deleteFailed')
      );
  }

}
