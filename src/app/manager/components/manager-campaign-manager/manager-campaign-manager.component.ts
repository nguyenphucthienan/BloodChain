import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';

import { CampaignManagerLiteTableService } from '../../services/campaign-manager-lite-table.service';

@Component({
  selector: 'app-manager-campaign-manager',
  templateUrl: './manager-campaign-manager.component.html',
  styleUrls: ['./manager-campaign-manager.component.scss'],
  providers: [CampaignManagerLiteTableService]
})
export class ManagerCampaignManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    public campaignManagerLiteTableService: CampaignManagerLiteTableService,
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
        tap((value: string) => this.searchCampaign(value))
      )
      .subscribe();
  }

  searchCampaign(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.campaignManagerLiteTableService.pagination.page = 1;
      this.campaignManagerLiteTableService.filterMode.name = value;
      this.datatable.refresh();
    }
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToCampaignDetail(tableCellChange.row.cells._id.value);
        break;
    }
  }

  navigateToCampaignDetail(id: string) {
    this.router.navigate(['/campaigns', id]);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
