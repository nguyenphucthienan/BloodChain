import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MDBModalRef } from 'angular-bootstrap-md';
import * as moment from 'moment';
import { Campaign } from 'src/app/core/models/campaign.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-campaign-update-modal',
  templateUrl: './campaign-update-modal.component.html',
  styleUrls: ['./campaign-update-modal.component.scss']
})
export class CampaignUpdateModalComponent implements OnInit {

  @Input() rowData: TableRow;

  @Output() campaignUpdated = new EventEmitter();

  updateForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    const startDate = new Date(this.rowData.cells.startDate.value);
    const momentStartDate = moment({
      d: startDate.getDate(),
      M: startDate.getMonth() + 1,
      y: startDate.getFullYear()
    });

    const endDate = new Date(this.rowData.cells.endDate.value);
    const momentEndDate = moment({
      d: endDate.getDate(),
      M: endDate.getMonth() + 1,
      y: endDate.getFullYear()
    });

    this.updateForm = this.fb.group({
      name: [this.rowData.cells.name.value, Validators.required],
      startDate: [momentStartDate, Validators.required],
      startTime: [`${startDate.getHours()}:${startDate.getMinutes()}`, Validators.required],
      endDate: [momentEndDate, Validators.required],
      endTime: [`${endDate.getHours()}:${endDate.getMinutes()}`, Validators.required],
      description: [this.rowData.cells.description.value, Validators.required],
    }, { validator: [this.startDateAndEndDateValidator] });
  }

  updateCampaign() {
    const data = this.buildData(this.updateForm.value);
    this.campaignService.updateCampaign(
      this.rowData.cells._id.value,
      data as unknown as Campaign
    ).subscribe(
      (campaign: Campaign) => {
        this.campaignUpdated.emit(campaign);
        this.alertService.success('campaignManager.alert.updateSuccess');
      },
      error => this.alertService.error('campaignManager.alert.updateFailed')
    );
  }

  private buildData(formValue: any) {
    const startTime = formValue.startTime.split(':');
    const startDate = moment(formValue.startDate)
      .add(startTime[0], 'hours')
      .add(startTime[1], 'minutes');

    const endTime = formValue.endTime.split(':');
    const endDate = moment(formValue.endDate)
      .add(endTime[0], 'hours')
      .add(endTime[1], 'minutes');

    return {
      name: formValue.name,
      startDate,
      endDate,
      description: formValue.description
    };
  }

  openDatePicker(picker: MatDatepicker<Date>) {
    picker.open();
  }

  datePickerFilter(momentDate: any): boolean {
    return momentDate.isSameOrAfter(moment().startOf('day'));
  }

  private startDateAndEndDateValidator(g: FormGroup) {
    if (!g.controls.startDate.value || !g.controls.endDate.value
      || !g.controls.startTime.value || !g.controls.endTime.value) {
      return null;
    }

    const startTime = g.controls.startTime.value.split(':');
    const startDate = moment(g.controls.startDate.value)
      .add(startTime[0], 'hours')
      .add(startTime[1], 'minutes');

    const endTime = g.controls.endTime.value.split(':');
    const endDate = moment(g.controls.endDate.value)
      .add(endTime[0], 'hours')
      .add(endTime[1], 'minutes');

    return startDate < endDate
      ? null
      : { startDateAndEndDate: true };
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.updateForm.get(controlName).touched
      && this.updateForm.get(controlName).hasError(errorName);
  }

}
