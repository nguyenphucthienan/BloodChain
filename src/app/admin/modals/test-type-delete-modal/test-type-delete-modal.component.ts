import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from 'src/app/core/services/alert.service';
import { TestTypeService } from 'src/app/core/services/test-type.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-test-type-delete-modal',
  templateUrl: './test-type-delete-modal.component.html',
  styleUrls: ['./test-type-delete-modal.component.scss']
})
export class TestTypeDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() testTypeDeleted = new EventEmitter();

  testTypeName: string;

  constructor(
    public modalRef: MDBModalRef,
    private testTypeService: TestTypeService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.testTypeName = this.rowData.cells.name.value;
  }

  deleteTestType() {
    this.testTypeService.deleteTestType(this.rowData.cells._id.value)
      .subscribe(
        () => {
          this.testTypeDeleted.emit();
          this.alertService.success('testTypeManager.alert.deleteSuccess');
        },
        error => this.alertService.error('testTypeManager.alert.deleteFailed')
      );
  }

}
