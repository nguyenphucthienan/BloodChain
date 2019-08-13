import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Award } from 'src/app/core/models/award.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AwardService } from 'src/app/core/services/award.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-award-update-modal',
  templateUrl: './award-update-modal.component.html',
  styleUrls: ['./award-update-modal.component.scss']
})
export class AwardUpdateModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() awardUpdated = new EventEmitter();

  updateForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private awardService: AwardService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    const codes = this.rowData.cells.codes.value.join(', ');
    this.updateForm = this.fb.group({
      name: [this.rowData.cells.name.value, Validators.required],
      point: [this.rowData.cells.point.value, [
        Validators.required,
        Validators.min(100),
        Validators.max(1000)
      ]],
      description: [this.rowData.cells.description.value, Validators.required],
      codes: [codes, Validators.required]
    });
  }

  updateAward() {
    const codes = this.updateForm.value.codes.split(', ');
    this.awardService.updateAward(
      this.rowData.cells._id.value,
      { ...this.updateForm.value, codes }
    ).subscribe(
      (award: Award) => {
        this.awardUpdated.emit(award);
        this.alertService.success('awardManager.alert.updateSuccess');
      },
      error => this.alertService.error('awardManager.alert.updateFailed')
    );
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.updateForm.get(controlName).touched
      && this.updateForm.get(controlName).hasError(errorName);
  }

}
