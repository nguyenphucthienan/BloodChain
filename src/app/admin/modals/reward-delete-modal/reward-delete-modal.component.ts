import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from 'src/app/core/services/alert.service';
import { RewardService } from 'src/app/core/services/reward.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-reward-delete-modal',
  templateUrl: './reward-delete-modal.component.html',
  styleUrls: ['./reward-delete-modal.component.scss']
})
export class RewardDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() rewardDeleted = new EventEmitter();

  rewardName: string;

  constructor(
    public modalRef: MDBModalRef,
    private rewardService: RewardService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.rewardName = this.rowData.cells.name.value;
  }

  deleteReward() {
    this.rewardService.deleteReward(this.rowData.cells._id.value)
      .subscribe(
        () => {
          this.rewardDeleted.emit();
          this.alertService.success('rewardManager.alert.deleteSuccess');
        },
        error => this.alertService.success('rewardManager.alert.deleteFailed')
      );
  }

}
