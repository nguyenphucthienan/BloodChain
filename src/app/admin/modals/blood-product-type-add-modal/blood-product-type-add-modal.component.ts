import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodProductType } from 'src/app/core/models/blood-product-type.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodProductTypeService } from 'src/app/core/services/blood-product-type.service';

@Component({
  selector: 'app-blood-product-type-add-modal',
  templateUrl: './blood-product-type-add-modal.component.html',
  styleUrls: ['./blood-product-type-add-modal.component.scss']
})
export class BloodProductTypeAddModalComponent implements OnInit {

  @Output() bloodProductTypeAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private bloodProductTypeService: BloodProductTypeService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addBloodProductType() {
    this.bloodProductTypeService.createBloodProductType(this.addForm.value)
      .subscribe(
        (bloodProductType: BloodProductType) => {
          this.bloodProductTypeAdded.emit(bloodProductType);
          this.alertService.success('bloodProductTypeManager.alert.addSuccess');
        },
        error => this.alertService.error('bloodProductTypeManager.alert.addFailed')
      );
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.addForm.get(controlName).touched
      && this.addForm.get(controlName).hasError(errorName);
  }

}
