import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { User } from 'src/app/core/models/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';

@Component({
  selector: 'app-manager-blood-pack-manager-blood-pack-detail',
  templateUrl: './manager-blood-pack-manager-blood-pack-detail.component.html',
  styleUrls: ['./manager-blood-pack-manager-blood-pack-detail.component.scss'],
  providers: [
    DatePipe
  ]
})
export class ManagerBloodPackManagerBloodPackDetailComponent implements OnInit, OnDestroy {

  bloodPack: BloodPack;

  userForm: FormGroup;
  bloodPackForm: FormGroup;

  modalRef: MDBModalRef;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private userService: UserService,
    private modalService: MDBModalService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.initForms();

    this.route.data.subscribe((data: any) => {
      this.bloodPack = data.bloodPack;
      this.userService.getUser(this.bloodPack.donor._id).subscribe((donor: User) => {
        this.userForm.patchValue({
          username: donor.username,
          firstName: donor.firstName,
          lastName: donor.lastName,
          gender: donor.gender,
          birthdate: donor.birthdate,
          email: donor.email,
          phone: donor.phone,
          address: donor.address,
          location: donor.location
        });

        this.bloodPackForm.patchValue({
          id: this.bloodPack._id,
          volume: this.bloodPack.volume,
          time: this.datePipe.transform(new Date(this.bloodPack.createdAt), 'medium'),
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
    });
  }

  private initForms() {
    this.userForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      gender: [null, Validators.required],
      birthdate: [null, Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      location: [null, Validators.required]
    });

    this.bloodPackForm = this.fb.group({
      id: ['', Validators.required],
      volume: [null, [Validators.required, Validators.min(1)]],
      time: [null, Validators.required],
      bloodCamp: ['', Validators.required],
      bloodTestCenter: ['', Validators.required],
      bloodSeparationCenter: ['', Validators.required],
      tested: [null, Validators.required],
      testPassed: [null, Validators.required],
      separated: [null, Validators.required]
    });

    this.userForm.disable();
    this.bloodPackForm.disable();
  }

  openBloodPackQrCodeModal() {
    // this.modalRef = this.modalService.show(UserQrcodeModalComponent, {
    //   backdrop: true,
    //   keyboard: true,
    //   focus: true,
    //   show: false,
    //   ignoreBackdropClick: true,
    //   class: 'modal-dialog-centered',
    //   containerClass: 'top',
    //   animated: true,
    //   data: {
    //     bloodPack: this.bloodPack
    //   }
    // });
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodProductDetail(tableCellChange.row.cells._id.value);
        break;
    }
  }

  navigateToBloodProductDetail(id: string) {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
