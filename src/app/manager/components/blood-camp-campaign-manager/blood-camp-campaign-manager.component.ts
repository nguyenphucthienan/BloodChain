import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { Campaign } from 'src/app/core/models/campaign.interface';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import { CampaignAddModalComponent } from '../../modals/campaign-add-modal/campaign-add-modal.component';
import { CampaignDeleteModalComponent } from '../../modals/campaign-delete-modal/campaign-delete-modal.component';
import {
  CampaignPhotoManagerModalComponent,
} from '../../modals/campaign-photo-manager-modal/campaign-photo-manager-modal.component';
import { CampaignUpdateModalComponent } from '../../modals/campaign-update-modal/campaign-update-modal.component';
import { BloodCampCampaignManagerTableService } from '../../services/blood-camp-campaign-manager-table.service';

@Component({
  selector: 'app-blood-camp-campaign-manager',
  templateUrl: './blood-camp-campaign-manager.component.html',
  styleUrls: ['./blood-camp-campaign-manager.component.scss'],
  providers: [BloodCampCampaignManagerTableService]
})
export class BloodCampCampaignManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public bloodCampCampaignManagerTableService: BloodCampCampaignManagerTableService,
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService,
    private modalService: MDBModalService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.authService.getMyUserInfo()
      .subscribe((user: User) => {
        this.bloodCampCampaignManagerTableService.filterMode['bloodCamp._id'] = user.bloodCamp._id;
        this.datatable.refresh();
      });
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchCampaign(value))
      )
      .subscribe();
  }

  searchCampaign(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.bloodCampCampaignManagerTableService.pagination.page = 1;
      this.bloodCampCampaignManagerTableService.filterMode.name = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToCampaignDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.ManagePhotos:
        this.openBloodCampPhotoManagerModal(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Update:
        this.openCampaignUpdateModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openCampaignDeleteModal(tableCellChange.row);
        break;
    }
  }

  navigateToCampaignDetail(id: string) {
    this.router.navigate(['/campaigns', id]);
  }

  openCampaignAddModal() {
    this.modalRef = this.modalService.show(CampaignAddModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.campaignAdded
      .subscribe((campaign: Campaign) => this.onCampaignAdded(campaign));
  }

  onCampaignAdded(campaign: Campaign) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openBloodCampPhotoManagerModal(id: string) {
    this.modalRef = this.modalService.show(CampaignPhotoManagerModalComponent, {
      backdrop: true,
      keyboard: false,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        campaignId: id,
      }
    });
  }

  openCampaignUpdateModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(CampaignUpdateModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        rowData
      }
    });

    this.modalRef.content.campaignUpdated
      .subscribe((campaign: Campaign) => this.onCampaignUpdated(campaign));
  }

  onCampaignUpdated(campaign: Campaign) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openCampaignDeleteModal(rowData: TableRow) {
    this.modalRef = this.modalService.show(CampaignDeleteModalComponent, {
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

    this.modalRef.content.campaignDeleted
      .subscribe(() => this.onCampaignDeleted());
  }

  onCampaignDeleted() {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
