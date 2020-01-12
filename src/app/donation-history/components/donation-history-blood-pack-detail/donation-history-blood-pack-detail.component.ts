import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { TestType } from 'src/app/core/models/test-type.interface';

@Component({
  selector: 'app-donation-history-blood-pack-detail',
  templateUrl: './donation-history-blood-pack-detail.component.html',
  styleUrls: ['./donation-history-blood-pack-detail.component.scss'],
  providers: [DatePipe]
})
export class DonationHistoryBloodPackDetailComponent implements OnInit, OnDestroy {

  readonly resultTranslations = [
    { translation: 'common.result.passed', value: true },
    { translation: 'common.result.failed', value: false }
  ];

  testTypes: TestType[];
  results: any[] = [];

  bloodPack: BloodPack;
  modalRef: MDBModalRef;

  bloodPackForm: FormGroup;
  testResultForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private translate: TranslateService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.initForms();
    this.initDataFields();
  }

  private initForms() {
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
      separated: [null, Validators.required],
      disposed: [null, Validators.required]
    });

    this.testResultForm = this.fb.group({
      testResults: this.fb.array([], Validators.required),
      testDescription: ['', Validators.required]
    });
  }

  private initDataFields() {
    this.translate.get(this.resultTranslations.map(resultTranslation => resultTranslation.translation))
      .subscribe(translations => {
        this.results = this.resultTranslations.map(resultTranslation => ({
          label: translations[resultTranslation.translation],
          value: resultTranslation.value
        }));
        this.route.data.subscribe((data: any) => {
          this.bloodPack = data.bloodPack;
          this.testTypes = data.testTypes;
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
            separated: this.bloodPack.separated,
            disposed: this.bloodPack.separated
          });

          if (this.bloodPack.tested) {
            let numOfFields = 0;
            if (this.bloodPack.testResults && this.bloodPack.testResults.length > 0) {
              numOfFields = this.bloodPack.testResults.length;
            }

            for (let i = 0; i < numOfFields; i++) {
              this.addTestField();
            }

            const extractedTestResults = this.bloodPack.testResults.map(testResult => {
              const type = this.testTypes.filter((testType: TestType) => testType._id === testResult.testType);
              const result = testResult.passed ? this.results[0].label : this.results[1].label;
              return {
                testType: type && type[0].name,
                passed: result
              };
            });

            this.testResultForm.patchValue({
              testResults: extractedTestResults,
              testDescription: this.bloodPack.testDescription
            });
          }
        });
      });
  }

  get testResultFormArray() {
    return this.testResultForm.get('testResults') as FormArray;
  }

  createTestField() {
    return this.fb.group({
      testType: [null, Validators.required],
      passed: [null, Validators.required]
    });
  }

  addTestField() {
    this.testResultFormArray.push(this.createTestField());
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
