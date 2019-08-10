import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

import { FilterMode } from '../core/models/filter-mode.interface';
import { Hospital } from '../core/models/hospital.interface';
import { Pagination } from '../core/models/pagination.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { HospitalService } from '../core/services/hospital.service';
import { MapInputComponent } from '../shared/components/map-input/map-input.component';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('search') search: ElementRef;
  @ViewChild(MapInputComponent) mapInput: MapInputComponent;

  hospitals: Hospital[] = [];

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
    private hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.getHospitals();
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchHospital(value))
      )
      .subscribe();
  }

  private getHospitals() {
    this.hospitalService.getHospitals(this.pagination, this.sortMode, this.filterMode)
      .subscribe((response: any) => {
        this.hospitals = response.items;
        this.pagination = response.pagination;
      });
  }

  searchHospital(value: string) {
    if (value.length === 0 || value.length > 2) {
      this.pagination.page = 1;
      this.filterMode.name = value;
      this.getHospitals();
    }
  }

  resetFilters() {
    this.search.nativeElement.value = null;
    this.mapInput.reset();
    this.filterMode = {};
    this.getHospitals();
  }

  onLocationChanged(location: any) {
    this.filterMode.location = `${location.lng},${location.lat}`;
    this.getHospitals();
  }

  onPageChanged(page: number) {
    this.pagination.page = page;
    this.getHospitals();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
    this.searchSubscription.unsubscribe();
  }

}
