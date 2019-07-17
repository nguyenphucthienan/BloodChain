import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { BloodProduct } from 'src/app/core/models/blood-product.interface';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';

import {
  BloodProductQrcodeModalComponent,
} from '../../modals/blood-product-qrcode-modal/blood-product-qrcode-modal.component';

@Component({
  selector: 'app-manager-blood-product-manager-blood-product-detail',
  templateUrl: './manager-blood-product-manager-blood-product-detail.component.html',
  styleUrls: ['./manager-blood-product-manager-blood-product-detail.component.scss'],
  providers: [DatePipe]
})
export class ManagerBloodProductManagerBloodProductDetailComponent implements OnInit, OnDestroy {

  bloodProduct: BloodProduct;
  modalRef: MDBModalRef;

  userForm: FormGroup;
  bloodPackForm: FormGroup;
  bloodProductForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private bloodPackService: BloodPackService,
    private modalService: MDBModalService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.initForms();

    this.route.data.subscribe((data: any) => {
      this.bloodProduct = data.bloodProduct;
      this.bloodPackService.getBloodPack(this.bloodProduct.bloodPack._id)
        .subscribe((bloodPack: BloodPack) => {
          this.userForm.patchValue({
            username: this.bloodProduct.donor.username,
            firstName: this.bloodProduct.donor.firstName,
            lastName: this.bloodProduct.donor.lastName,
          });

          this.bloodPackForm.patchValue({
            id: bloodPack._id,
            volume: bloodPack.volume,
            time: this.datePipe.transform(new Date(bloodPack.createdAt), 'medium'),
            bloodCamp: bloodPack.bloodCamp.name,
            bloodTestCenter: bloodPack.bloodTestCenter && bloodPack.bloodTestCenter.name,
            bloodSeparationCenter: bloodPack.bloodSeparationCenter && bloodPack.bloodSeparationCenter.name,
            bloodType: bloodPack.bloodType,
            tested: bloodPack.tested,
            testPassed: bloodPack.testPassed,
            separated: bloodPack.separated
          });

          this.bloodProductForm.patchValue({
            id: this.bloodProduct._id,
            volume: this.bloodProduct.volume,
            time: this.datePipe.transform(new Date(this.bloodProduct.createdAt), 'medium'),
            bloodType: this.bloodProduct.bloodType,
            bloodProductType: this.bloodProduct.bloodProductType && this.bloodProduct.bloodProductType.name,
            expirationDate: this.datePipe.transform(new Date(this.bloodProduct.expirationDate)),
          });
        });
    });
  }

  private initForms() {
    this.userForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]]
    });

    this.bloodPackForm = this.fb.group({
      id: ['', Validators.required],
      volume: [null, [Validators.required, Validators.min(1)]],
      time: [null, Validators.required],
      bloodCamp: ['', Validators.required],
      bloodTestCenter: ['', Validators.required],
      bloodSeparationCenter: ['', Validators.required],
      bloodType: [null, Validators.required],
      tested: [null, Validators.required],
      testPassed: [null, Validators.required],
      separated: [null, Validators.required]
    });

    this.bloodProductForm = this.fb.group({
      id: ['', Validators.required],
      volume: [null, [Validators.required, Validators.min(1)]],
      time: [null, Validators.required],
      bloodType: [null, Validators.required],
      bloodProductType: [null, Validators.required],
      bloodSeparationCenter: ['', Validators.required],
      expirationDate: [null, Validators.required]
    });

    this.userForm.disable();
    this.bloodPackForm.disable();
    this.bloodProductForm.disable();
  }

  openBloodProductQrCodeModal() {
    this.modalRef = this.modalService.show(BloodProductQrcodeModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        bloodProduct: this.bloodProduct
      }
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
