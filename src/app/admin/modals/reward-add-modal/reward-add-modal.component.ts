import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Reward } from 'src/app/core/models/reward.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { RewardService } from 'src/app/core/services/reward.service';

@Component({
  selector: 'app-reward-add-modal',
  templateUrl: './reward-add-modal.component.html',
  styleUrls: ['./reward-add-modal.component.scss']
})
export class RewardAddModalComponent implements OnInit {

  @Output() rewardAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private rewardService: RewardService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      point: [100, [Validators.required, Validators.min(100), Validators.max(1000)]],
      description: ['', Validators.required]
    });
  }

  addReward() {
    this.rewardService.createReward(this.addForm.value)
      .subscribe(
        (reward: Reward) => {
          this.rewardAdded.emit(reward);
          this.alertService.success('rewardManager.alert.addSuccess');
        },
        error => this.alertService.error('rewardManager.alert.addFailed')
      );
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.addForm.get(controlName).touched
      && this.addForm.get(controlName).hasError(errorName);
  }

}
