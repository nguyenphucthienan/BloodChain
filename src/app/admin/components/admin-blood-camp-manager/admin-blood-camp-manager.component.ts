import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';

import { BloodCampManagerTableService } from '../../services/blood-camp-manager-table.service';

@Component({
  selector: 'app-admin-blood-camp-manager',
  templateUrl: './admin-blood-camp-manager.component.html',
  styleUrls: ['./admin-blood-camp-manager.component.scss'],
  providers: [BloodCampManagerTableService]
})
export class AdminBloodCampManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;

  constructor(public bloodCampManagerTableService: BloodCampManagerTableService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchBloodCamp(value))
      )
      .subscribe();
  }

  searchBloodCamp(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.bloodCampManagerTableService.pagination.page = 0;
      this.bloodCampManagerTableService.filterMode.name = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodCampDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Delete:
        this.openDeleteBloodCampModal(tableCellChange.row.cells._id.value);
        break;
    }
  }

  navigateToBloodCampDetail(id: string) {
  }

  openDeleteBloodCampModal(id: string) {
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
