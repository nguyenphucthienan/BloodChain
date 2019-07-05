import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodBank } from 'src/app/core/models/blood-bank.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodBankService } from 'src/app/core/services/blood-bank.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-bank-update-modal',
  templateUrl: './blood-bank-update-modal.component.html',
  styleUrls: ['./blood-bank-update-modal.component.scss']
})
export class BloodBankUpdateModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() bloodBankUpdated = new EventEmitter();

  updateForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private bloodBankService: BloodBankService,
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

  updateBloodBank() {
    this.bloodBankService.updateBloodBank(
      this.rowData.cells._id.value,
      this.updateForm.value
    ).subscribe(
      (bloodBank: BloodBank) => {
        this.bloodBankUpdated.emit(bloodBank);
        this.alertService.success('bloodBankManager.alert.updateSuccess');
      },
      error => this.alertService.error('bloodBankManager.alert.updateFailed')
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
