import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from 'src/app/core/services/alert.service';
import { AwardService } from 'src/app/core/services/award.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-award-delete-modal',
  templateUrl: './award-delete-modal.component.html',
  styleUrls: ['./award-delete-modal.component.scss']
})
export class AwardDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() awardDeleted = new EventEmitter();

  awardName: string;

  constructor(
    public modalRef: MDBModalRef,
    private awardService: AwardService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.awardName = this.rowData.cells.name.value;
  }

  deleteAward() {
    this.awardService.deleteAward(this.rowData.cells._id.value)
      .subscribe(
        () => {
          this.awardDeleted.emit();
          this.alertService.success('awardManager.alert.deleteSuccess');
        },
        error => this.alertService.success('awardManager.alert.deleteFailed')
      );
  }

}
