import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Award } from 'src/app/core/models/award.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AwardService } from 'src/app/core/services/award.service';

@Component({
  selector: 'app-award-add-modal',
  templateUrl: './award-add-modal.component.html',
  styleUrls: ['./award-add-modal.component.scss']
})
export class AwardAddModalComponent implements OnInit {

  @Output() awardAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private awardService: AwardService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      point: [100, [Validators.required, Validators.min(100), Validators.max(1000)]],
      description: ['', Validators.required],
      codes: ['', Validators.required]
    });
  }

  addAward() {
    const codes = this.addForm.value.codes.split(', ');
    this.awardService.createAward({ ...this.addForm.value, codes })
      .subscribe(
        (award: Award) => {
          this.awardAdded.emit(award);
          this.alertService.success('awardManager.alert.addSuccess');
        },
        error => this.alertService.error('awardManager.alert.addFailed')
      );
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.addForm.get(controlName).touched
      && this.addForm.get(controlName).hasError(errorName);
  }

}
