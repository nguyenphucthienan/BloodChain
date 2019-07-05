import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { Hospital } from 'src/app/core/models/hospital.interface';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import { HospitalAddModalComponent } from '../../modals/hospital-add-modal/hospital-add-modal.component';
import { HospitalUpdateModalComponent } from '../../modals/hospital-update-modal/hospital-update-modal.component';
import { HospitalManagerTableService } from '../../services/hospital-manager-table.service';

@Component({
  selector: 'app-admin-hospital-manager',
  templateUrl: './admin-hospital-manager.component.html',
  styleUrls: ['./admin-hospital-manager.component.scss'],
  providers: [HospitalManagerTableService]
})
export class AdminHospitalManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public hospitalManagerTableService: HospitalManagerTableService,
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
        tap((value: string) => this.searchHospital(value))
      )
      .subscribe();
  }

  searchHospital(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.hospitalManagerTableService.pagination.page = 1;
      this.hospitalManagerTableService.filterMode.name = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToHospitalDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Assign:
        this.openHospitalAssignStaffsModal(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Update:
        this.openHospitalUpdateModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openHospitalDeleteModal(tableCellChange.row);
        break;
    }
  }

  navigateToHospitalDetail(id: string) {
  }

  openHospitalAddModal() {
    this.modalRef = this.modalService.show(HospitalAddModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.hospitalAdded
      .subscribe((hospital: Hospital) => this.onHospitalAdded(hospital));
  }

  onHospitalAdded(hospital: Hospital) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openHospitalAssignStaffsModal(id: string) {
    // this.modalRef = this.modalService.show(HospitalAssignStaffsModalComponent, {
    //   backdrop: true,
    //   keyboard: true,
    //   focus: true,
    //   show: false,
    //   ignoreBackdropClick: true,
    //   class: 'modal-lg modal-dialog-centered',
    //   containerClass: 'top',
    //   animated: true,
    //   data: {
    //     hospitalId: id,
    //   }
    // });

    // this.modalRef.content.hospitalStaffUpdated
    //   .subscribe((result: any) => this.onHospitalAssignedStaffs(result));
  }

  onHospitalAssignedStaffs(result: any) {
    this.modalRef.hide();
  }

  openHospitalUpdateModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(HospitalUpdateModalComponent, {
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

    this.modalRef.content.hospitalUpdated
      .subscribe((hospital: Hospital) => this.onHospitalUpdated(hospital));
  }

  onHospitalUpdated(hospital: Hospital) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openHospitalDeleteModal(rowData: TableRow) {
    // this.modalRef = this.modalService.show(HospitalDeleteModalComponent, {
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

    // this.modalRef.content.hospitalDeleted
    //   .subscribe(() => this.onHospitalDeleted());
  }

  onHospitalDeleted() {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
