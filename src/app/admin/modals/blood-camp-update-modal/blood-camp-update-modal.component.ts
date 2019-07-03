import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodCamp } from 'src/app/core/models/blood-camp.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodCampService } from 'src/app/core/services/blood-camp.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-camp-update-modal',
  templateUrl: './blood-camp-update-modal.component.html',
  styleUrls: ['./blood-camp-update-modal.component.scss']
})
export class BloodCampUpdateModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() bloodCampUpdated = new EventEmitter();

  updateForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private bloodCampService: BloodCampService,
    private alertService: AlertService,
    private translate: TranslateService
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

  updateBloodCamp() {
    this.bloodCampService.updateBloodCamp(
      this.rowData.cells._id.value,
      this.updateForm.value
    ).subscribe(
      (bloodCamp: BloodCamp) => {
        this.bloodCampUpdated.emit(bloodCamp);
        this.translate.get('bloodCampManager.alert.updateSuccess')
          .subscribe(updateSuccess => this.alertService.success(updateSuccess));
      },
      error => {
        this.translate.get('bloodCampManager.alert.updateFailed')
          .subscribe(updateFailed => this.alertService.error(updateFailed));
      }
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
