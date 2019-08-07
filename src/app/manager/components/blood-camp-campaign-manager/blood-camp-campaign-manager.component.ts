import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';

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
    }
  }

  navigateToCampaignDetail(id: string) {
    this.router.navigate(['/manager', 'campaigns', id]);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
