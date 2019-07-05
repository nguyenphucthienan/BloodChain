import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { BloodBank } from 'src/app/core/models/blood-bank.interface';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import { BloodBankAddModalComponent } from '../../modals/blood-bank-add-modal/blood-bank-add-modal.component';
import { BloodBankUpdateModalComponent } from '../../modals/blood-bank-update-modal/blood-bank-update-modal.component';
import { BloodBankManagerTableService } from '../../services/blood-bank-manager-table.service';

@Component({
  selector: 'app-admin-blood-bank-manager',
  templateUrl: './admin-blood-bank-manager.component.html',
  styleUrls: ['./admin-blood-bank-manager.component.scss'],
  providers: [BloodBankManagerTableService]
})
export class AdminBloodBankManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public bloodBankManagerTableService: BloodBankManagerTableService,
    private renderer: Renderer2,
    private modalService: MDBModalService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchBloodBank(value))
      )
      .subscribe();
  }

  searchBloodBank(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.bloodBankManagerTableService.pagination.page = 1;
      this.bloodBankManagerTableService.filterMode.name = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodBankDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Assign:
        this.openBloodBankAssignStaffsModal(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Update:
        this.openBloodBankUpdateModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openBloodBankDeleteModal(tableCellChange.row);
        break;
    }
  }

  navigateToBloodBankDetail(id: string) {
  }

  openBloodBankAddModal() {
    this.modalRef = this.modalService.show(BloodBankAddModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.bloodBankAdded
      .subscribe((bloodBank: BloodBank) => this.onBloodBankAdded(bloodBank));
  }

  onBloodBankAdded(bloodBank: BloodBank) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openBloodBankAssignStaffsModal(id: string) {
    // this.modalRef = this.modalService.show(BloodBankAssignStaffsModalComponent, {
    //   backdrop: true,
    //   keyboard: true,
    //   focus: true,
    //   show: false,
    //   ignoreBackdropClick: true,
    //   class: 'modal-lg modal-dialog-centered',
    //   containerClass: 'top',
    //   animated: true,
    //   data: {
    //     bloodBankId: id,
    //   }
    // });

    // this.modalRef.content.bloodBankStaffUpdated
    //   .subscribe((result: any) => this.onBloodBankAssignedStaffs(result));
  }

  onBloodBankAssignedStaffs(result: any) {
    this.modalRef.hide();
  }

  openBloodBankUpdateModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(BloodBankUpdateModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        rowData,
      }
    });

    this.modalRef.content.bloodBankUpdated
      .subscribe((bloodBank: BloodBank) => this.onBloodBankUpdated(bloodBank));
  }

  onBloodBankUpdated(bloodBank: BloodBank) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openBloodBankDeleteModal(rowData: TableRow) {
    // this.modalRef = this.modalService.show(BloodBankDeleteModalComponent, {
    //   backdrop: true,
    //   keyboard: true,
    //   focus: true,
    //   show: false,
    //   ignoreBackdropClick: true,
    //   class: 'modal-dialog-centered',
    //   containerClass: 'top',
    //   animated: true,
    //   data: {
    //     rowData
    //   }
    // });

    // this.modalRef.content.bloodBankDeleted
    //   .subscribe(() => this.onBloodBankDeleted());
  }

  onBloodBankDeleted() {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
