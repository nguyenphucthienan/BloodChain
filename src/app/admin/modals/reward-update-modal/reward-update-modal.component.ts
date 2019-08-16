import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Reward } from 'src/app/core/models/reward.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { RewardService } from 'src/app/core/services/reward.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-reward-update-modal',
  templateUrl: './reward-update-modal.component.html',
  styleUrls: ['./reward-update-modal.component.scss']
})
export class RewardUpdateModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() rewardUpdated = new EventEmitter();

  updateForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private rewardService: RewardService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [this.rowData.cells.name.value, Validators.required],
      point: [this.rowData.cells.point.value, [
        Validators.required,
        Validators.min(100),
        Validators.max(10000)
      ]],
      description: [this.rowData.cells.description.value, Validators.required]
    });
  }

  updateReward() {
    this.rewardService.updateReward(
      this.rowData.cells._id.value,
      this.updateForm.value,
    ).subscribe(
      (reward: Reward) => {
        this.rewardUpdated.emit(reward);
        this.alertService.success('rewardManager.alert.updateSuccess');
      },
      error => this.alertService.error('rewardManager.alert.updateFailed')
    );
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.updateForm.get(controlName).touched
      && this.updateForm.get(controlName).hasError(errorName);
  }

}
