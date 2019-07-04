import { HttpParams } from '@angular/common/http';

import { FilterMode } from '../core/models/filter-mode.interface';
import { Pagination } from '../core/models/pagination.interface';
import { SortMode } from '../core/models/sort-mode.interface';

export class ParamsBuilder {

  private params: HttpParams;

  constructor() {
    this.params = new HttpParams();
  }

  setParam(key: string, value: string) {
    this.params = this.params
      .set(key, value);

    return this;
  }

  applyPagination(pagination: Pagination) {
    this.params = this.params
      .set('page', pagination.page.toString())
      .set('size', pagination.size.toString());

    return this;
  }

  applySort(sortMode: SortMode) {
    let sortString: string;
    if (sortMode.isSortAscending) {
      sortString = `+${sortMode.sortBy}`;
    } else {
      sortString = `-${sortMode.sortBy}`;
    }

    if (sortString) {
      this.params = this.params.set('sort', sortString);
    }

    return this;
  }

  applyFilter(filterMode: FilterMode) {
    for (const key in filterMode) {
      if (filterMode[key]) {
        this.params = this.params.set(key, filterMode[key]);
      }
    }

    return this;
  }

  build() {
    return this.params;
  }

}
