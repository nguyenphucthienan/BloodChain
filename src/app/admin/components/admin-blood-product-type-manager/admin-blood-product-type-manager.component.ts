import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { BloodProductType } from 'src/app/core/models/blood-product-type.interface';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import {
  BloodProductTypeAddModalComponent,
} from '../../modals/blood-product-type-add-modal/blood-product-type-add-modal.component';
import {
  BloodProductTypeUpdateModalComponent,
} from '../../modals/blood-product-type-update-modal/blood-product-type-update-modal.component';
import { BloodProductTypeManagerTableService } from '../../services/blood-product-type-manager-table.service';

@Component({
  selector: 'app-admin-blood-product-type-manager',
  templateUrl: './admin-blood-product-type-manager.component.html',
  styleUrls: ['./admin-blood-product-type-manager.component.scss'],
  providers: [BloodProductTypeManagerTableService]
})
export class AdminBloodProductTypeManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public bloodProductTypeManagerTableService: BloodProductTypeManagerTableService,
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
        tap((value: string) => this.searchBloodProductType(value))
      )
      .subscribe();
  }

  searchBloodProductType(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.bloodProductTypeManagerTableService.pagination.page = 1;
      this.bloodProductTypeManagerTableService.filterMode.name = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodProductTypeDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Update:
        this.openBloodProductTypeUpdateModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openBloodProductTypeDeleteModal(tableCellChange.row);
        break;
    }
  }

  navigateToBloodProductTypeDetail(id: string) {
  }

  openBloodProductTypeAddModal() {
    this.modalRef = this.modalService.show(BloodProductTypeAddModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.bloodProductTypeAdded
      .subscribe((bloodProductType: BloodProductType) => this.onBloodProductTypeAdded(bloodProductType));
  }

  onBloodProductTypeAdded(bloodProductType: BloodProductType) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openBloodProductTypeUpdateModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(BloodProductTypeUpdateModalComponent, {
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

    this.modalRef.content.bloodProductTypeUpdated
      .subscribe((bloodProductType: BloodProductType) => this.onBloodProductTypeUpdated(bloodProductType));
  }

  onBloodProductTypeUpdated(bloodProductType: BloodProductType) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openBloodProductTypeDeleteModal(rowData: TableRow) {
    // this.modalRef = this.modalService.show(BloodProductTypeDeleteModalComponent, {
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

    // this.modalRef.content.bloodProductTypeDeleted
    //   .subscribe(() => this.onBloodProductTypeDeleted());
  }

  onBloodProductTypeDeleted() {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
