import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';

import {
  BloodSeparationCenterBloodPackManagerTableService,
} from '../../services/blood-separation-center-blood-pack-manager-table.service';

@Component({
  selector: 'app-blood-separation-center-blood-pack-manager',
  templateUrl: './blood-separation-center-blood-pack-manager.component.html',
  styleUrls: ['./blood-separation-center-blood-pack-manager.component.scss'],
  providers: [BloodSeparationCenterBloodPackManagerTableService]
})
export class BloodSeparationCenterBloodPackManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public bloodSeparationCenterBloodPackManagerTableService: BloodSeparationCenterBloodPackManagerTableService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchBloodPack(value))
      )
      .subscribe();
  }

  searchBloodPack(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.bloodSeparationCenterBloodPackManagerTableService.pagination.page = 1;
      this.bloodSeparationCenterBloodPackManagerTableService.filterMode._id = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodPackDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Update:
        this.navigateToUpdateBloodPackResult(tableCellChange.row.cells._id.value);
        break;
    }
  }

  async navigateToTransferBloodPack() {
    const selectedIds = Array.from(this.datatable.getSelectedRowIds().selectedIds);
    const selectedRows = this.datatable.rows
      .filter(row => selectedIds.includes(row.cells._id.value));

    this.router.navigate(['/manager', 'blood-separation-center', 'blood-packs', 'transfer'], {
      state: { bloodPacks: selectedRows }
    });
  }

  navigateToBloodPackDetail(id: string) {
  }

  navigateToUpdateBloodPackResult(id?: string) {
    this.router.navigate(['/manager', 'blood-separation-center', 'blood-packs', 'update'], {
      state: { bloodPackId: id }
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
