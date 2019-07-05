import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Hospital } from 'src/app/core/models/hospital.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { HospitalService } from 'src/app/core/services/hospital.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-hospital-update-modal',
  templateUrl: './hospital-update-modal.component.html',
  styleUrls: ['./hospital-update-modal.component.scss']
})
export class HospitalUpdateModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() hospitalUpdated = new EventEmitter();

  updateForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private hospitalService: HospitalService,
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

  updateHospital() {
    this.hospitalService.updateHospital(
      this.rowData.cells._id.value,
      this.updateForm.value
    ).subscribe(
      (hospital: Hospital) => {
        this.hospitalUpdated.emit(hospital);
        this.alertService.success('hospitalManager.alert.updateSuccess');
      },
      error => this.alertService.error('hospitalManager.alert.updateFailed')
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
