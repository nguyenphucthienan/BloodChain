import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Reward } from 'src/app/core/models/reward.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { RewardService } from 'src/app/core/services/reward.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-reward-code-manager-modal',
  templateUrl: './reward-code-manager-modal.component.html',
  styleUrls: ['./reward-code-manager-modal.component.scss']
})
export class RewardCodeManagerModalComponent implements OnInit {

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
      codes: [this.rowData.cells.codes && this.rowData.cells.codes.value.join(', ')],
      codesToAdd: [null],
      codesToRemove: [null]
    });
  }

  updateRewardCodes() {
    const codesToAdd = this.updateForm.value.codesToAdd
      && this.updateForm.value.codesToAdd.split(', ');
    const codesToRemove = this.updateForm.value.codesToRemove
      && this.updateForm.value.codesToRemove.split(', ');

    this.rewardService.updateRewardCodes(
      this.rowData.cells._id.value,
      { codesToAdd, codesToRemove }
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
