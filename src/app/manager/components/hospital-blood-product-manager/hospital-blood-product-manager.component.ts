import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { ScanQrcodeModalComponent } from 'src/app/shared/modals/scan-qrcode-modal/scan-qrcode-modal.component';

import { HospitalBloodProductManagerTableService } from '../../services/hospital-blood-product-manager-table.service';

@Component({
  selector: 'app-hospital-blood-product-manager',
  templateUrl: './hospital-blood-product-manager.component.html',
  styleUrls: ['./hospital-blood-product-manager.component.scss'],
  providers: [HospitalBloodProductManagerTableService]
})
export class HospitalBloodProductManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public hospitalBloodProductManagerTableService: HospitalBloodProductManagerTableService,
    private router: Router,
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
        tap((value: string) => this.searchBloodProduct(value))
      )
      .subscribe();
  }

  searchBloodProduct(value: string) {
    if (value.length === 0 || value.length === 24) {
      this.hospitalBloodProductManagerTableService.pagination.page = 1;
      this.hospitalBloodProductManagerTableService.filterMode._id = value;
      this.datatable.refresh();
    }
  }

  openScanQrCodeModal() {
    this.modalRef = this.modalService.show(ScanQrcodeModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.scanSuccess
      .subscribe((bloodProductId: string) => this.onQrCodeScanSuccess(bloodProductId));
  }

  onQrCodeScanSuccess(bloodProductId: string) {
    this.hospitalBloodProductManagerTableService.filterMode._id = bloodProductId;
    this.datatable.refresh();
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodProductDetail(tableCellChange.row.cells._id.value);
        break;
    }
  }

  navigateToTransferBloodProduct() {
    const selectedIds = Array.from(this.datatable.getSelectedRowIds().selectedIds);
    const selectedRows = this.datatable.rows
      .filter(row => selectedIds.includes(row.cells._id.value)
        && (!row.cells.used || !row.cells.used.value));

    this.router.navigate(['/manager', 'hospital', 'blood-products', 'transfer'], {
      state: { bloodProducts: selectedRows }
    });
  }

  navigateToUseBloodProduct() {
    const selectedIds = Array.from(this.datatable.getSelectedRowIds().selectedIds);
    const selectedRows = this.datatable.rows
      .filter(row => selectedIds.includes(row.cells._id.value)
        && (!row.cells.used || !row.cells.used.value));

    this.router.navigate(['/manager', 'hospital', 'blood-products', 'use'], {
      state: { bloodProducts: selectedRows }
    });
  }

  navigateToBloodProductDetail(id: string) {
    this.router.navigate(['/manager', 'blood-products', id]);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
