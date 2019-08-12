import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

import { BloodTestCenter } from '../core/models/blood-test-center.interface';
import { FilterMode } from '../core/models/filter-mode.interface';
import { Pagination } from '../core/models/pagination.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { BloodTestCenterService } from '../core/services/blood-test-center.service';
import { MapInputComponent } from '../shared/components/map-input/map-input.component';

@Component({
  selector: 'app-blood-test-centers',
  templateUrl: './blood-test-centers.component.html',
  styleUrls: ['./blood-test-centers.component.scss']
})
export class BloodTestCentersComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('search') search: ElementRef;
  @ViewChild(MapInputComponent) mapInput: MapInputComponent;

  bloodTestCenters: BloodTestCenter[] = [];

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
    private bloodTestCenterService: BloodTestCenterService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.getBloodTestCenters();
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchBloodTestCenter(value))
      )
      .subscribe();
  }

  private getBloodTestCenters() {
    this.bloodTestCenterService.getBloodTestCenters(this.pagination, this.sortMode, this.filterMode)
      .subscribe((response: any) => {
        this.bloodTestCenters = response.items;
        this.pagination = response.pagination;
      });
  }

  searchBloodTestCenter(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.pagination.page = 1;
      this.filterMode.name = value;
      this.getBloodTestCenters();
    }
  }

  resetFilters() {
    this.search.nativeElement.value = null;
    this.mapInput.reset();
    this.filterMode = {};
    this.getBloodTestCenters();
  }

  onLocationChanged(location: any) {
    this.filterMode.location = `${location.lng},${location.lat}`;
    this.getBloodTestCenters();
  }

  onPageChanged(page: number) {
    this.pagination.page = page;
    this.getBloodTestCenters();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
