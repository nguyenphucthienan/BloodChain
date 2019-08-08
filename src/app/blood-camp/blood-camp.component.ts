import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

import { BloodCamp } from '../core/models/blood-camp.interface';
import { FilterMode } from '../core/models/filter-mode.interface';
import { Pagination } from '../core/models/pagination.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { BloodCampService } from '../core/services/blood-camp.service';
import { MapInputComponent } from '../shared/components/map-input/map-input.component';

@Component({
  selector: 'app-blood-camp',
  templateUrl: './blood-camp.component.html',
  styleUrls: ['./blood-camp.component.scss']
})
export class BloodCampComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('search') search: ElementRef;
  @ViewChild(MapInputComponent) mapInput: MapInputComponent;

  bloodCamps: BloodCamp[] = [];

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
    private bloodCampService: BloodCampService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.getBloodCamps();
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

  private getBloodCamps() {
    this.bloodCampService.getBloodCamps(this.pagination, this.sortMode, this.filterMode)
      .subscribe((response: any) => {
        this.bloodCamps = response.items;
        this.pagination = response.pagination;
      });
  }

  searchBloodCamp(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.pagination.page = 1;
      this.filterMode.name = value;
      this.getBloodCamps();
    }
  }

  resetFilters() {
    this.search.nativeElement.value = null;
    this.mapInput.selectCurrentLocation();
    this.filterMode = {};
    this.getBloodCamps();
  }

  onLocationChanged(location: any) {
    this.filterMode.lat = location.lng;
    this.filterMode.lng = location.lng;
    this.getBloodCamps();
  }

  onPageChanged(page: number) {
    this.pagination.page = page;
    this.getBloodCamps();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
