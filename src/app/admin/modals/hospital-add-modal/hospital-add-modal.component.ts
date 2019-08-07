import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Hospital } from 'src/app/core/models/hospital.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { HospitalService } from 'src/app/core/services/hospital.service';

@Component({
  selector: 'app-hospital-add-modal',
  templateUrl: './hospital-add-modal.component.html',
  styleUrls: ['./hospital-add-modal.component.scss']
})
export class HospitalAddModalComponent implements OnInit {

  @Output() hospitalAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      location: [null, Validators.required]
    });
  }

  addHospital() {
    this.hospitalService.createHospital(this.addForm.value)
      .subscribe(
        (hospital: Hospital) => {
          this.hospitalAdded.emit(hospital);
          this.alertService.success('hospitalManager.alert.addSuccess');
        },
        error => this.alertService.error('hospitalManager.alert.addFailed')
      );
  }

  onLocationChanged(location: any) {
    this.addForm.patchValue({
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat]
      }
    });
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.addForm.get(controlName).touched
      && this.addForm.get(controlName).hasError(errorName);
  }

}
