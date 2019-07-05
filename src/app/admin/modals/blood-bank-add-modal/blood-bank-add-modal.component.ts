import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodBank } from 'src/app/core/models/blood-bank.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodBankService } from 'src/app/core/services/blood-bank.service';

@Component({
  selector: 'app-blood-bank-add-modal',
  templateUrl: './blood-bank-add-modal.component.html',
  styleUrls: ['./blood-bank-add-modal.component.scss']
})
export class BloodBankAddModalComponent implements OnInit {

  @Output() bloodBankAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private bloodBankService: BloodBankService,
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

  addBloodBank() {
    this.bloodBankService.createBloodBank(this.addForm.value)
      .subscribe(
        (bloodBank: BloodBank) => {
          this.bloodBankAdded.emit(bloodBank);
          this.alertService.success('bloodBankManager.alert.addSuccess');
        },
        error => this.alertService.error('bloodBankManager.alert.addFailed')
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
