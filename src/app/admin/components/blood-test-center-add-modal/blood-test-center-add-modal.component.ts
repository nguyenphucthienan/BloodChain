import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodTestCenter } from 'src/app/core/models/blood-test-center.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodTestCenterService } from 'src/app/core/services/blood-test-center.service';

@Component({
  selector: 'app-blood-test-center-add-modal',
  templateUrl: './blood-test-center-add-modal.component.html',
  styleUrls: ['./blood-test-center-add-modal.component.scss']
})
export class BloodTestCenterAddModalComponent implements OnInit {

  @Output() bloodTestCenterAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private bloodTestCenterService: BloodTestCenterService,
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

  addBloodTestCenter() {
    this.bloodTestCenterService.createBloodTestCenter(this.addForm.value)
      .subscribe(
        (bloodTestCenter: BloodTestCenter) => {
          this.bloodTestCenterAdded.emit(bloodTestCenter);
          this.alertService.success('bloodTestCenterManager.alert.addSuccess');
        },
        error => this.alertService.error('bloodTestCenterManager.alert.addFailed')
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
