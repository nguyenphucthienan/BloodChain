import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { Award } from 'src/app/core/models/award.interface';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import { AwardAddModalComponent } from '../../modals/award-add-modal/award-add-modal.component';
import { AwardPhotoManagerModalComponent } from '../../modals/award-photo-manager-modal/award-photo-manager-modal.component';
import { AwardUpdateModalComponent } from '../../modals/award-update-modal/award-update-modal.component';
import { AwardManagerTableService } from '../../services/award-manager-table.service';

@Component({
  selector: 'app-admin-award-manager',
  templateUrl: './admin-award-manager.component.html',
  styleUrls: ['./admin-award-manager.component.scss'],
  providers: [AwardManagerTableService]
})
export class AdminAwardManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public awardManagerTableService: AwardManagerTableService,
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
        tap((value: string) => this.searchAward(value))
      )
      .subscribe();
  }

  searchAward(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.awardManagerTableService.pagination.page = 1;
      this.awardManagerTableService.filterMode.name = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToAwardDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.ManagePhotos:
        this.openAwardPhotoManagerModal(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Update:
        this.openAwardUpdateModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openAwardDeleteModal(tableCellChange.row);
        break;
    }
  }

  navigateToAwardDetail(id: string) {
  }

  openAwardAddModal() {
    this.modalRef = this.modalService.show(AwardAddModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.awardAdded
      .subscribe((award: Award) => this.onAwardAdded(award));
  }

  onAwardAdded(award: Award) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openAwardPhotoManagerModal(id: string) {
    this.modalRef = this.modalService.show(AwardPhotoManagerModalComponent, {
      backdrop: true,
      keyboard: false,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        awardId: id,
      }
    });
  }

  openAwardUpdateModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(AwardUpdateModalComponent, {
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

    this.modalRef.content.awardUpdated
      .subscribe((award: Award) => this.onAwardUpdated(award));
  }

  onAwardUpdated(award: Award) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openAwardDeleteModal(rowData: TableRow) {
    // this.modalRef = this.modalService.show(AwardDeleteModalComponent, {
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

    // this.modalRef.content.awardDeleted
    //   .subscribe(() => this.onAwardDeleted());
  }

  onAwardDeleted() {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
