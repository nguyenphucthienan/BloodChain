import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.interface';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import { UserManagerTableService } from '../../services/user-manager-table.service';

@Component({
  selector: 'app-admin-user-manager',
  templateUrl: './admin-user-manager.component.html',
  styleUrls: ['./admin-user-manager.component.scss'],
  providers: [UserManagerTableService]
})
export class AdminUserManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public userManagerTableService: UserManagerTableService,
    private modalService: MDBModalService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchUser(value))
      )
      .subscribe();
  }

  searchUser(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.userManagerTableService.pagination.page = 0;
      this.userManagerTableService.filterMode.username = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToUserDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Update:
        this.openUserUpdateModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openUserDeleteModal(tableCellChange.row);
        break;
    }
  }

  navigateToUserDetail(id: string) {
  }

  openUserAddModal() {
  }

  onUserAdded(user: User) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openUserUpdateModal(rowData: TableRow) {
  }

  onUserUpdated(user: User) {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  openUserDeleteModal(rowData: TableRow) {
  }

  onUserDeleted() {
    this.modalRef.hide();
    this.datatable.refresh();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
