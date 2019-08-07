import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MDBModalRef } from 'angular-bootstrap-md';
import * as moment from 'moment';
import { Campaign } from 'src/app/core/models/campaign.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { CampaignService } from 'src/app/core/services/campaign.service';

@Component({
  selector: 'app-campaign-add-modal',
  templateUrl: './campaign-add-modal.component.html',
  styleUrls: ['./campaign-add-modal.component.scss']
})
export class CampaignAddModalComponent implements OnInit {

  @Output() campaignAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      startDate: [null, Validators.required],
      startTime: ['', Validators.required],
      endDate: [null, Validators.required],
      endTime: ['', Validators.required],
      description: ['', Validators.required],
    }, { validator: [this.startDateAndEndDateValidator] });
  }

  addCampaign() {
    const data = this.buildData(this.addForm.value);
    this.campaignService.createCampaign(data as unknown as Campaign)
      .subscribe(
        (campaign: Campaign) => {
          this.campaignAdded.emit(campaign);
          this.alertService.success('campaignManager.alert.addSuccess');
        },
        error => this.alertService.error('campaignManager.alert.addFailed')
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
    return this.addForm.get(controlName).touched
      && this.addForm.get(controlName).hasError(errorName);
  }

}
