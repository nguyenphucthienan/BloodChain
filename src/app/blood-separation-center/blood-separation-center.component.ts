import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

import { BloodSeparationCenter } from '../core/models/blood-separation-center.interface';
import { FilterMode } from '../core/models/filter-mode.interface';
import { Pagination } from '../core/models/pagination.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { BloodSeparationCenterService } from '../core/services/blood-separation-center.service';
import { MapInputComponent } from '../shared/components/map-input/map-input.component';

@Component({
  selector: 'app-blood-separation-center',
  templateUrl: './blood-separation-center.component.html',
  styleUrls: ['./blood-separation-center.component.scss']
})
export class BloodSeparationCenterComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('search') search: ElementRef;
  @ViewChild(MapInputComponent) mapInput: MapInputComponent;

  bloodSeparationCenters: BloodSeparationCenter[] = [];

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
    private bloodSeparationCenterService: BloodSeparationCenterService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.getBloodSeparationCenters();
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchBloodSeparationCenter(value))
      )
      .subscribe();
  }

  private getBloodSeparationCenters() {
    this.bloodSeparationCenterService.getBloodSeparationCenters(this.pagination, this.sortMode, this.filterMode)
      .subscribe((response: any) => {
        this.bloodSeparationCenters = response.items;
        this.pagination = response.pagination;
      });
  }

  searchBloodSeparationCenter(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.pagination.page = 1;
      this.filterMode.name = value;
      this.getBloodSeparationCenters();
    }
  }

  resetFilters() {
    this.search.nativeElement.value = null;
    this.mapInput.reset();
    this.filterMode = {};
    this.getBloodSeparationCenters();
  }

  onLocationChanged(location: any) {
    this.filterMode.location = `${location.lng},${location.lat}`;
    this.getBloodSeparationCenters();
  }

  onPageChanged(page: number) {
    this.pagination.page = page;
    this.getBloodSeparationCenters();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
