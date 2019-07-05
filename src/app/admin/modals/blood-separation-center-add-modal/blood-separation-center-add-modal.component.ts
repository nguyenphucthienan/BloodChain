import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodSeparationCenter } from 'src/app/core/models/blood-separation-center.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodSeparationCenterService } from 'src/app/core/services/blood-separation-center.service';

@Component({
  selector: 'app-blood-separation-center-add-modal',
  templateUrl: './blood-separation-center-add-modal.component.html',
  styleUrls: ['./blood-separation-center-add-modal.component.scss']
})
export class BloodSeparationCenterAddModalComponent implements OnInit {

  @Output() bloodSeparationCenterAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private bloodSeparationCenterService: BloodSeparationCenterService,
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

  addBloodSeparationCenter() {
    this.bloodSeparationCenterService.createBloodSeparationCenter(this.addForm.value)
      .subscribe(
        (bloodSeparationCenter: BloodSeparationCenter) => {
          this.bloodSeparationCenterAdded.emit(bloodSeparationCenter);
          this.alertService.success('bloodSeparationCenterManager.alert.addSuccess');
        },
        error => this.alertService.error('bloodSeparationCenterManager.alert.addFailed')
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
