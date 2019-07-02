import { Component, OnInit } from '@angular/core';
import { BloodCamp } from 'src/app/core/models/blood-camp.interface';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { BloodCampService } from 'src/app/core/services/blood-camp.service';

@Component({
  selector: 'app-admin-blood-camp-manager',
  templateUrl: './admin-blood-camp-manager.component.html',
  styleUrls: ['./admin-blood-camp-manager.component.scss']
})
export class AdminBloodCampManagerComponent implements OnInit {

  bloodCamps: BloodCamp[] = [];

  pagination: Pagination = {
    page: 1,
    size: 10
  };

  filterMode: FilterMode = {};

  constructor(private bloodCampService: BloodCampService) { }

  ngOnInit() {
    this.getBloodCamps();
  }

  getBloodCamps() {
    this.bloodCampService.getBloodCamps(
      this.pagination,
      undefined,
      this.filterMode
    ).subscribe((response: any) => {
      this.bloodCamps = response.items;
      this.pagination = response.pagination;
    });
  }

}
