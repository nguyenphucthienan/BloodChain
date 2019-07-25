import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';

@Component({
  selector: 'app-donation-history-blood-pack-detail',
  templateUrl: './donation-history-blood-pack-detail.component.html',
  styleUrls: ['./donation-history-blood-pack-detail.component.scss'],
  providers: [DatePipe]
})
export class DonationHistoryBloodPackDetailComponent implements OnInit, OnDestroy {

  bloodPack: BloodPack;
  modalRef: MDBModalRef;

  bloodPackForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.bloodPackForm = this.fb.group({
      id: ['', Validators.required],
      volume: [null, [Validators.required, Validators.min(1)]],
      time: [null, Validators.required],
      bloodType: [null, Validators.required],
      bloodCamp: ['', Validators.required],
      bloodTestCenter: ['', Validators.required],
      bloodSeparationCenter: ['', Validators.required],
      tested: [null, Validators.required],
      testPassed: [null, Validators.required],
      separated: [null, Validators.required]
    });

    this.bloodPackForm.disable();
    this.route.data.subscribe((data: any) => {
      this.bloodPack = data.bloodPack;
      this.bloodPackForm.patchValue({
        id: this.bloodPack._id,
        volume: this.bloodPack.volume,
        time: this.datePipe.transform(new Date(this.bloodPack.createdAt), 'medium'),
        bloodType: this.bloodPack.bloodType,
        bloodCamp: this.bloodPack.bloodCamp.name,
        bloodTestCenter: this.bloodPack.bloodTestCenter
          && this.bloodPack.bloodTestCenter.name,
        bloodSeparationCenter: this.bloodPack.bloodSeparationCenter
          && this.bloodPack.bloodSeparationCenter.name,
        tested: this.bloodPack.tested,
        testPassed: this.bloodPack.testPassed,
        separated: this.bloodPack.separated
      });
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
