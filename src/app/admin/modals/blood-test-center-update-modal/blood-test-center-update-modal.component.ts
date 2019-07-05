import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodTestCenter } from 'src/app/core/models/blood-test-center.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodTestCenterService } from 'src/app/core/services/blood-test-center.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-test-center-update-modal',
  templateUrl: './blood-test-center-update-modal.component.html',
  styleUrls: ['./blood-test-center-update-modal.component.scss']
})
export class BloodTestCenterUpdateModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() bloodTestCenterUpdated = new EventEmitter();

  updateForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private bloodTestCenterService: BloodTestCenterService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [this.rowData.cells.name.value, Validators.required],
      address: [this.rowData.cells.address.value, Validators.required],
      phone: [this.rowData.cells.phone.value, Validators.required],
      email: [this.rowData.cells.email.value, Validators.required],
      location: [this.rowData.cells.location.value, Validators.required]
    });

    if (this.rowData.cells.location) {
      const { 0: lng, 1: lat } = this.rowData.cells.location.value.coordinates;
      this.changeLocation({ lng, lat });
    }
  }

  updateBloodTestCenter() {
    this.bloodTestCenterService.updateBloodTestCenter(
      this.rowData.cells._id.value,
      this.updateForm.value
    ).subscribe(
      (bloodTestCenter: BloodTestCenter) => {
        this.bloodTestCenterUpdated.emit(bloodTestCenter);
        this.alertService.success('bloodTestCenterManager.alert.updateSuccess');
      },
      error => this.alertService.error('bloodTestCenterManager.alert.updateFailed')
    );
  }

  changeLocation(location: any) {
    this.updateForm.patchValue({
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat]
      }
    });
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.updateForm.get(controlName).touched
      && this.updateForm.get(controlName).hasError(errorName);
  }

}
