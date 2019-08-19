import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodProductTypeService } from 'src/app/core/services/blood-product-type.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-product-type-delete-modal',
  templateUrl: './blood-product-type-delete-modal.component.html',
  styleUrls: ['./blood-product-type-delete-modal.component.scss']
})
export class BloodProductTypeDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() bloodProductTypeDeleted = new EventEmitter();

  bloodProductTypeName: string;

  constructor(
    public modalRef: MDBModalRef,
    private bloodProductTypeService: BloodProductTypeService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.bloodProductTypeName = this.rowData.cells.name.value;
  }

  deleteBloodProductType() {
    this.bloodProductTypeService.deleteBloodProductType(this.rowData.cells._id.value)
      .subscribe(
        () => {
          this.bloodProductTypeDeleted.emit();
          this.alertService.success('bloodProductTypeManager.alert.deleteSuccess');
        },
        error => this.alertService.error('bloodProductTypeManager.alert.deleteFailed')
      );
  }

}
