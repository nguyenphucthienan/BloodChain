import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { Reward } from 'src/app/core/models/reward.interface';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import { RewardAddModalComponent } from '../../modals/reward-add-modal/reward-add-modal.component';
import { RewardCodeManagerModalComponent } from '../../modals/reward-code-manager-modal/reward-code-manager-modal.component';
import { RewardDeleteModalComponent } from '../../modals/reward-delete-modal/reward-delete-modal.component';
import {
  RewardPhotoManagerModalComponent,
} from '../../modals/reward-photo-manager-modal/reward-photo-manager-modal.component';
import { RewardUpdateModalComponent } from '../../modals/reward-update-modal/reward-update-modal.component';
import { RewardManagerTableService } from '../../services/reward-manager-table.service';

@Component({
  selector: 'app-admin-reward-manager',
  templateUrl: './admin-reward-manager.component.html',
  styleUrls: ['./admin-reward-manager.component.scss'],
  providers: [RewardManagerTableService]
})
export class AdminRewardManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public rewardManagerTableService: RewardManagerTableService,
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
        tap((value: string) => this.searchReward(value))
      )
      .subscribe();
  }

  searchReward(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.rewardManagerTableService.pagination.page = 1;
      this.rewardManagerTableService.filterMode.name = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToRewardDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Assign:
        this.openRewardCodeManagerModal(tableCellChange.row);
        break;
      case TableActionType.ManagePhotos:
        this.openRewardPhotoManagerModal(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Update:
        this.openRewardUpdateModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openRewardDeleteModal(tableCellChange.row);
        break;
    }
  }

  navigateToRewardDetail(id: string) {
  }

  openRewardAddModal() {
    this.modalRef = this.modalService.show(RewardAddModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.rewardAdded
      .subscribe((reward: Reward) => this.onRewardAdded(reward));
  }

  onRewardAdded(reward: Reward) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openRewardPhotoManagerModal(id: string) {
    this.modalRef = this.modalService.show(RewardPhotoManagerModalComponent, {
      backdrop: true,
      keyboard: false,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        rewardId: id,
      }
    });
  }

  openRewardUpdateModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(RewardUpdateModalComponent, {
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

    this.modalRef.content.rewardUpdated
      .subscribe((reward: Reward) => this.onRewardUpdated(reward));
  }

  onRewardUpdated(reward: Reward) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openRewardCodeManagerModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(RewardCodeManagerModalComponent, {
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

    this.modalRef.content.rewardUpdated
      .subscribe((reward: Reward) => this.onRewardCodesUpdated(reward));
  }

  onRewardCodesUpdated(reward: Reward) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openRewardDeleteModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(RewardDeleteModalComponent, {
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

    this.modalRef.content.rewardDeleted
      .subscribe(() => this.onRewardDeleted());
  }

  onRewardDeleted() {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
