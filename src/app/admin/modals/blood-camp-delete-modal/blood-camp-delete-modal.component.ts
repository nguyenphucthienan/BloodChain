import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodCampService } from 'src/app/core/services/blood-camp.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-camp-delete-modal',
  templateUrl: './blood-camp-delete-modal.component.html',
  styleUrls: ['./blood-camp-delete-modal.component.scss']
})
export class BloodCampDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() bloodCampDeleted = new EventEmitter();

  bloodCampName: string;

  constructor(
    public modalRef: MDBModalRef,
    private bloodCampService: BloodCampService,
    private alertService: AlertService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.bloodCampName = this.rowData.cells.name.value;
  }

  deleteBloodCamp() {
    this.bloodCampService.deleteBloodCamp(this.rowData.cells._id.value)
      .subscribe(
        () => {
          this.bloodCampDeleted.emit();
          this.translate.get('bloodCampManager.alert.deleteSuccess')
            .subscribe(deleteSuccess => this.alertService.success(deleteSuccess));
        },
        error => {
          this.translate.get('bloodCampManager.alert.deleteFailed')
            .subscribe(deleteFailed => this.alertService.success(deleteFailed));
        }
      );
  }

}
