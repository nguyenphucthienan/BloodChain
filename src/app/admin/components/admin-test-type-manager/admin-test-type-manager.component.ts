import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { TestType } from 'src/app/core/models/test-type.interface';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import { TestTypeAddModalComponent } from '../../modals/test-type-add-modal/test-type-add-modal.component';
import { TestTypeUpdateModalComponent } from '../../modals/test-type-update-modal/test-type-update-modal.component';
import { TestTypeManagerTableService } from '../../services/test-type-manager-table.service';

@Component({
  selector: 'app-admin-test-type-manager',
  templateUrl: './admin-test-type-manager.component.html',
  styleUrls: ['./admin-test-type-manager.component.scss'],
  providers: [TestTypeManagerTableService]
})
export class AdminTestTypeManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public testTypeManagerTableService: TestTypeManagerTableService,
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
        tap((value: string) => this.searchTestType(value))
      )
      .subscribe();
  }

  searchTestType(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.testTypeManagerTableService.pagination.page = 1;
      this.testTypeManagerTableService.filterMode.name = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToTestTypeDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Update:
        this.openTestTypeUpdateModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openTestTypeDeleteModal(tableCellChange.row);
        break;
    }
  }

  navigateToTestTypeDetail(id: string) {
  }

  openTestTypeAddModal() {
    this.modalRef = this.modalService.show(TestTypeAddModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.testTypeAdded
      .subscribe((testType: TestType) => this.onTestTypeAdded(testType));
  }

  onTestTypeAdded(testType: TestType) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openTestTypeUpdateModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(TestTypeUpdateModalComponent, {
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

    this.modalRef.content.testTypeUpdated
      .subscribe((testType: TestType) => this.onTestTypeUpdated(testType));
  }

  onTestTypeUpdated(testType: TestType) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openTestTypeDeleteModal(rowData: TableRow) {
    // this.modalRef = this.modalService.show(TestTypeDeleteModalComponent, {
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

    // this.modalRef.content.testTypeDeleted
    //   .subscribe(() => this.onTestTypeDeleted());
  }

  onTestTypeDeleted() {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
