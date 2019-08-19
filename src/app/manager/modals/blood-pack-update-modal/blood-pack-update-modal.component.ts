import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-pack-update-modal',
  templateUrl: './blood-pack-update-modal.component.html',
  styleUrls: ['./blood-pack-update-modal.component.scss']
})
export class BloodPackUpdateModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() bloodPackUpdated = new EventEmitter();

  updateForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private bloodPackService: BloodPackService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      donor: [this.rowData.cells.donor.value._id, Validators.required],
      volume: [this.rowData.cells.volume.value, [Validators.required, Validators.min(1)]]
    });
  }

  updateBloodPack() {
    const { donor, volume } = this.updateForm.value;
    const bloodPack = { donor: donor._id, volume } as BloodPack;
    this.bloodPackService.updateBloodPack(
      this.rowData.cells._id.value,
      bloodPack
    ).subscribe(
      (updatedBloodPack: BloodPack) => {
        this.bloodPackUpdated.emit(updatedBloodPack);
        this.alertService.success('bloodPackManager.alert.updateSuccess');
      },
      error => this.alertService.error('bloodPackManager.alert.updateFailed')
    );
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.updateForm.get(controlName).touched
      && this.updateForm.get(controlName).hasError(errorName);
  }

}
