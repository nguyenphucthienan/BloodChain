import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodCampService } from 'src/app/core/services/blood-camp.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blood-camp-photo-manager-modal',
  templateUrl: './blood-camp-photo-manager-modal.component.html',
  styleUrls: ['./blood-camp-photo-manager-modal.component.scss']
})
export class BloodCampPhotoManagerModalComponent implements OnInit {

  private readonly photoUploadUrl = `${environment.apiUrl}/blood-camps/{bloodCampId}/photos`;

  @Input() bloodCampId: string;
  @Input() rowData: TableRow;
  @Output() closed = new EventEmitter();

  uploadUrl: string;

  constructor(
    public modalRef: MDBModalRef,
    private bloodCampService: BloodCampService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.uploadUrl = UrlUtils.resolvePathVariables(this.photoUploadUrl, {
      bloodCampId: this.bloodCampId
    });
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}
