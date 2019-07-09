import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';

import { BloodCampBloodPackManagerTableService } from '../../services/blood-camp-blood-pack-manager-table.service';

@Component({
  selector: 'app-blood-camp-blood-pack-manager',
  templateUrl: './blood-camp-blood-pack-manager.component.html',
  styleUrls: ['./blood-camp-blood-pack-manager.component.scss'],
  providers: [BloodCampBloodPackManagerTableService]
})
export class BloodCampBloodPackManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public bloodCampBloodPackManagerTableService: BloodCampBloodPackManagerTableService,
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
      this.bloodCampBloodPackManagerTableService.pagination.page = 1;
      this.bloodCampBloodPackManagerTableService.filterMode._id = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodPackDetail(tableCellChange.row.cells._id.value);
        break;
    }
  }

  async navigateToTransferBloodPack() {
    const selectedIds = Array.from(this.datatable.getSelectedRowIds().selectedIds);
    const selectedBloodPacks = this.datatable.rows
      .filter(row => selectedIds.includes(row.cells._id.value))
      .map(row => ({
        _id: row.cells._id.value,
        donor: row.cells.donor.value,
        volume: row.cells.volume.value
      }));

    this.router.navigate(['/manager', 'blood-camp', 'blood-packs', 'transfer'], {
      state: { bloodPacks: selectedBloodPacks }
    });
  }

  navigateToBloodPackDetail(id: string) {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
