import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from 'src/app/core/services/alert.service';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-campaign-delete-modal',
  templateUrl: './campaign-delete-modal.component.html',
  styleUrls: ['./campaign-delete-modal.component.scss']
})
export class CampaignDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() campaignDeleted = new EventEmitter();

  campaignName: string;

  constructor(
    public modalRef: MDBModalRef,
    private campaignService: CampaignService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.campaignName = this.rowData.cells.name.value;
  }

  deleteCampaign() {
    this.campaignService.deleteCampaign(this.rowData.cells._id.value)
      .subscribe(
        () => {
          this.campaignDeleted.emit();
          this.alertService.success('campaignManager.alert.deleteSuccess');
        },
        error => this.alertService.error('campaignManager.alert.deleteFailed')
      );
  }

}
