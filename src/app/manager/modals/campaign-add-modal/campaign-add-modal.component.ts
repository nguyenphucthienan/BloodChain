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
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addCampaign() {
    this.campaignService.createCampaign(this.addForm.value)
      .subscribe(
        (campaign: Campaign) => {
          this.campaignAdded.emit(campaign);
          this.alertService.success('campaignManager.alert.addSuccess');
        },
        error => this.alertService.error('campaignManager.alert.addFailed')
      );
  }

  openDatePicker(picker: MatDatepicker<Date>) {
    picker.open();
  }

  datePickerFilter(momentDate: any): boolean {
    return momentDate.isSameOrAfter(moment().startOf('day'));
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.addForm.get(controlName).touched
      && this.addForm.get(controlName).hasError(errorName);
  }

}
