import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { RewardService } from 'src/app/core/services/reward.service';
import * as Web3Utils from 'web3-utils';

@Component({
  selector: 'app-reward-redeem-ethereum-confirm-modal',
  templateUrl: './reward-redeem-ethereum-confirm-modal.component.html',
  styleUrls: ['./reward-redeem-ethereum-confirm-modal.component.scss']
})
export class RewardRedeemEthereumConfirmModalComponent implements OnInit {

  @Input() ethereumPlan: any;
  @Output() rewardRedeemed = new EventEmitter();

  @ViewChild('address') address: ElementRef;

  loading = true;
  currentPoint: number;
  rewardPoint: number;
  remainingPoint: number;

  redeemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private rewardService: RewardService,
    public modalRef: MDBModalRef,
    private alertService: AlertService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.redeemForm = this.fb.group({
      planName: [this.ethereumPlan.name, Validators.required],
      address: [null, [Validators.required, this.checkEthAddressValid.bind(this)]]
    });

    this.authService.getMyUserInfoOnBlockchain().subscribe((user: any) => {
      this.loading = false;
      this.currentPoint = user ? user.point : 0;
      this.rewardPoint = this.ethereumPlan.point;
      this.remainingPoint = this.currentPoint - this.rewardPoint;
    });
  }

  redeemReward() {
    this.spinnerService.show();
    this.rewardService.redeemEthereum(this.redeemForm.value)
      .subscribe(
        (response) => {
          this.spinnerService.hide();
          this.alertService.success('rewardManager.message.redeemEthereumSuccess');
          this.rewardRedeemed.emit({
            transactionId: response.transactionId,
          });
        },
        (error) => {
          this.spinnerService.hide();
          this.alertService.error('rewardManager.message.redeemEthereumFailed');
        }
      );
  }

  checkEthAddressValid(c: FormControl) {
    const isValid = c.value && Web3Utils.isAddress(c.value);
    return isValid ? null : { ethAddressNotValid: true };
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.redeemForm.get(controlName).touched
      && this.redeemForm.get(controlName).hasError(errorName);
  }

}
