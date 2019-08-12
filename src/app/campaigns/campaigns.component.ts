import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

import { Campaign } from '../core/models/campaign.interface';
import { FilterMode } from '../core/models/filter-mode.interface';
import { Pagination } from '../core/models/pagination.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { CampaignService } from '../core/services/campaign.service';
import { MapInputComponent } from '../shared/components/map-input/map-input.component';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('search') search: ElementRef;
  @ViewChild(MapInputComponent) mapInput: MapInputComponent;

  campaigns: Campaign[] = [];

  pagination: Pagination = {
    page: 1,
    size: 10
  };

  sortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  filterMode: FilterMode = {};

  searchSubscription: Subscription;
  modalRef: MDBModalRef;

  constructor(
    private renderer: Renderer2,
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.getCampaigns();
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

  private getCampaigns() {
    this.campaignService.getCampaigns(this.pagination, this.sortMode, this.filterMode)
      .subscribe((response: any) => {
        this.campaigns = response.items;
        this.pagination = response.pagination;
      });
  }

  searchCampaign(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.pagination.page = 1;
      this.filterMode.name = value;
      this.getCampaigns();
    }
  }

  resetFilters() {
    this.search.nativeElement.value = null;
    this.mapInput.reset();
    this.filterMode = {};
    this.getCampaigns();
  }

  onLocationChanged(location: any) {
    this.filterMode['bloodCamp.location'] = `${location.lng},${location.lat}`;
    this.getCampaigns();
  }

  onPageChanged(page: number) {
    this.pagination.page = page;
    this.getCampaigns();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
