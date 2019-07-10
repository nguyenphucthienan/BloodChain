import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { TestType } from 'src/app/core/models/test-type.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { TestTypeService } from 'src/app/core/services/test-type.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-test-type-update-modal',
  templateUrl: './test-type-update-modal.component.html',
  styleUrls: ['./test-type-update-modal.component.scss']
})
export class TestTypeUpdateModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() testTypeUpdated = new EventEmitter();

  updateForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private testTypeService: TestTypeService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [this.rowData.cells.name.value, Validators.required],
      description: [this.rowData.cells.description.value, Validators.required],
    });
  }

  updateTestType() {
    this.testTypeService.updateTestType(
      this.rowData.cells._id.value,
      this.updateForm.value
    ).subscribe(
      (testType: TestType) => {
        this.testTypeUpdated.emit(testType);
        this.alertService.success('testTypeManager.alert.updateSuccess');
      },
      error => this.alertService.error('testTypeManager.alert.updateFailed')
    );
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.updateForm.get(controlName).touched
      && this.updateForm.get(controlName).hasError(errorName);
  }

}
