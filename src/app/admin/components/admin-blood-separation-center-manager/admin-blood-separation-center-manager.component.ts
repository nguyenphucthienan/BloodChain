import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { BloodSeparationCenter } from 'src/app/core/models/blood-separation-center.interface';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import {
  BloodSeparationCenterAddModalComponent,
} from '../../modals/blood-separation-center-add-modal/blood-separation-center-add-modal.component';
import {
  BloodSeparationCenterUpdateModalComponent,
} from '../../modals/blood-separation-center-update-modal/blood-separation-center-update-modal.component';
import { BloodSeparationCenterManagerTableService } from '../../services/blood-separation-center-manager-table.service';

@Component({
  selector: 'app-admin-blood-separation-center-manager',
  templateUrl: './admin-blood-separation-center-manager.component.html',
  styleUrls: ['./admin-blood-separation-center-manager.component.scss'],
  providers: [BloodSeparationCenterManagerTableService]
})
export class AdminBloodSeparationCenterManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public bloodSeparationCenterManagerTableService: BloodSeparationCenterManagerTableService,
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
        tap((value: string) => this.searchBloodSeparationCenter(value))
      )
      .subscribe();
  }

  searchBloodSeparationCenter(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.bloodSeparationCenterManagerTableService.pagination.page = 1;
      this.bloodSeparationCenterManagerTableService.filterMode.name = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodSeparationCenterDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Assign:
        this.openBloodSeparationCenterAssignStaffsModal(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Update:
        this.openBloodSeparationCenterUpdateModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openBloodSeparationCenterDeleteModal(tableCellChange.row);
        break;
    }
  }

  navigateToBloodSeparationCenterDetail(id: string) {
  }

  openBloodSeparationCenterAddModal() {
    this.modalRef = this.modalService.show(BloodSeparationCenterAddModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.bloodSeparationCenterAdded
      .subscribe((bloodSeparationCenter: BloodSeparationCenter) => this.onBloodSeparationCenterAdded(bloodSeparationCenter));
  }

  onBloodSeparationCenterAdded(bloodSeparationCenter: BloodSeparationCenter) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openBloodSeparationCenterAssignStaffsModal(id: string) {
    // this.modalRef = this.modalService.show(BloodSeparationCenterAssignStaffsModalComponent, {
    //   backdrop: true,
    //   keyboard: true,
    //   focus: true,
    //   show: false,
    //   ignoreBackdropClick: true,
    //   class: 'modal-lg modal-dialog-centered',
    //   containerClass: 'top',
    //   animated: true,
    //   data: {
    //     bloodSeparationCenterId: id,
    //   }
    // });

    // this.modalRef.content.bloodSeparationCenterStaffUpdated
    //   .subscribe((result: any) => this.onBloodSeparationCenterAssignedStaffs(result));
  }

  onBloodSeparationCenterAssignedStaffs(result: any) {
    this.modalRef.hide();
  }

  openBloodSeparationCenterUpdateModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(BloodSeparationCenterUpdateModalComponent, {
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

    this.modalRef.content.bloodSeparationCenterUpdated
      .subscribe((bloodSeparationCenter: BloodSeparationCenter) => this.onBloodSeparationCenterUpdated(bloodSeparationCenter));
  }

  onBloodSeparationCenterUpdated(bloodSeparationCenter: BloodSeparationCenter) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openBloodSeparationCenterDeleteModal(rowData: TableRow) {
    // this.modalRef = this.modalService.show(BloodSeparationCenterDeleteModalComponent, {
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

    // this.modalRef.content.bloodSeparationCenterDeleted
    //   .subscribe(() => this.onBloodSeparationCenterDeleted());
  }

  onBloodSeparationCenterDeleted() {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
