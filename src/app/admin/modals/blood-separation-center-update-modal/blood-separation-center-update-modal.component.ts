import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodSeparationCenter } from 'src/app/core/models/blood-separation-center.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodSeparationCenterService } from 'src/app/core/services/blood-separation-center.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-separation-center-update-modal',
  templateUrl: './blood-separation-center-update-modal.component.html',
  styleUrls: ['./blood-separation-center-update-modal.component.scss']
})
export class BloodSeparationCenterUpdateModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() bloodSeparationCenterUpdated = new EventEmitter();

  updateForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private bloodSeparationCenterService: BloodSeparationCenterService,
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

  updateBloodSeparationCenter() {
    this.bloodSeparationCenterService.updateBloodSeparationCenter(
      this.rowData.cells._id.value,
      this.updateForm.value
    ).subscribe(
      (bloodSeparationCenter: BloodSeparationCenter) => {
        this.bloodSeparationCenterUpdated.emit(bloodSeparationCenter);
        this.alertService.success('bloodSeparationCenterManager.alert.updateSuccess');
      },
      error => this.alertService.error('bloodSeparationCenterManager.alert.updateFailed')
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
