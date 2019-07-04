import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { BloodCamp } from 'src/app/core/models/blood-camp.interface';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import { BloodCampAddModalComponent } from '../../modals/blood-camp-add-modal/blood-camp-add-modal.component';
import {
  BloodCampAssignStaffsModalComponent,
} from '../../modals/blood-camp-assign-staffs-modal/blood-camp-assign-staffs-modal.component';
import { BloodCampDeleteModalComponent } from '../../modals/blood-camp-delete-modal/blood-camp-delete-modal.component';
import { BloodCampUpdateModalComponent } from '../../modals/blood-camp-update-modal/blood-camp-update-modal.component';
import { BloodCampManagerTableService } from '../../services/blood-camp-manager-table.service';

@Component({
  selector: 'app-admin-blood-camp-manager',
  templateUrl: './admin-blood-camp-manager.component.html',
  styleUrls: ['./admin-blood-camp-manager.component.scss'],
  providers: [BloodCampManagerTableService]
})
export class AdminBloodCampManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public bloodCampManagerTableService: BloodCampManagerTableService,
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
        tap((value: string) => this.searchBloodCamp(value))
      )
      .subscribe();
  }

  searchBloodCamp(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.bloodCampManagerTableService.pagination.page = 0;
      this.bloodCampManagerTableService.filterMode.name = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodCampDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Assign:
        this.openBloodCampAssignStaffsModal(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Update:
        this.openBloodCampUpdateModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openBloodCampDeleteModal(tableCellChange.row);
        break;
    }
  }

  navigateToBloodCampDetail(id: string) {
  }

  openBloodCampAddModal() {
    this.modalRef = this.modalService.show(BloodCampAddModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.bloodCampAdded
      .subscribe((bloodCamp: BloodCamp) => this.onBloodCampAdded(bloodCamp));
  }

  onBloodCampAdded(bloodCamp: BloodCamp) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openBloodCampAssignStaffsModal(id: string) {
    this.modalRef = this.modalService.show(BloodCampAssignStaffsModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        bloodCampId: id,
      }
    });

    this.modalRef.content.bloodCampStaffUpdated
      .subscribe((result: any) => this.onBloodCampAssignedStaffs(result));
  }

  onBloodCampAssignedStaffs(result: any) {
    this.modalRef.hide();
  }

  openBloodCampUpdateModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(BloodCampUpdateModalComponent, {
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

    this.modalRef.content.bloodCampUpdated
      .subscribe((bloodCamp: BloodCamp) => this.onBloodCampUpdated(bloodCamp));
  }

  onBloodCampUpdated(bloodCamp: BloodCamp) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openBloodCampDeleteModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(BloodCampDeleteModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        rowData
      }
    });

    this.modalRef.content.bloodCampDeleted
      .subscribe(() => this.onBloodCampDeleted());
  }

  onBloodCampDeleted() {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
