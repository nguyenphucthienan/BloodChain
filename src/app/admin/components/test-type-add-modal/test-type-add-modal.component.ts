import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { TestType } from 'src/app/core/models/test-type.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { TestTypeService } from 'src/app/core/services/test-type.service';

@Component({
  selector: 'app-test-type-add-modal',
  templateUrl: './test-type-add-modal.component.html',
  styleUrls: ['./test-type-add-modal.component.scss']
})
export class TestTypeAddModalComponent implements OnInit {

  @Output() testTypeAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private testTypeService: TestTypeService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addTestType() {
    this.testTypeService.createTestType(this.addForm.value)
      .subscribe(
        (testType: TestType) => {
          this.testTypeAdded.emit(testType);
          this.alertService.success('testTypeManager.alert.addSuccess');
        },
        error => this.alertService.error('testTypeManager.alert.addFailed')
      );
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.addForm.get(controlName).touched
      && this.addForm.get(controlName).hasError(errorName);
  }

}
